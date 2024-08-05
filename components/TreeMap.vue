<template>
	<div id="map" class="absolute inset-0 bg-orange-100"></div>
</template>

<script setup lang="ts">
	import "leaflet/dist/leaflet.css"
	import * as L from "leaflet"
	import { type Tree } from "~/types"

	const GRIFTPARK = {
		lat: 52.10054,
		lng: 5.12518,
	}

	const props = defineProps<{
		trees: Tree[]
	}>()

	let markers: string[] = []

	const emit = defineEmits(["move"])

	function markerId(tree: Tree) {
		return `${tree.latitude}-${tree.longitude}-${tree.species_name_dutch}-${tree.planting_year}`
	}

	let map: L.Map | null = null

	watch(
		() => props.trees,
		() => {
			for (let tree of props.trees) {
				if (markers.includes(markerId(tree))) {
					continue
				}

				console.log("adding marker...")
				L.marker([tree.latitude, tree.longitude])
					.bindPopup(`${tree.species_name_dutch} (${tree.planting_year})`)
					.addTo(map)
				markers.push(markerId(tree))
			}
		},
	)

	onMounted(() => {
		map = L.map("map").setView([GRIFTPARK.lat, GRIFTPARK.lng], 20)

		map.on("moveend", () => {
			emit("move", map?.getCenter())
		})

		map.on("resize", () => {
			emit("move", map?.getCenter())
		})

		map.on("zoomend", () => {
			emit("move", map?.getCenter())
		})

		L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
			maxZoom: 19,
			attribution:
				'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
		}).addTo(map)
	})
</script>
