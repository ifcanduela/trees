<template>
	<div class="font-mono">
		<NuxtRouteAnnouncer />

		<div class="flex gap-8 p-8 h-screen bg-gray-50">
			<aside>
				<div>Search by species</div>
			</aside>

			<main class="relative grow">
				<TreeMap :trees="filteredTrees" @move="handleMapMove" />
			</main>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { type Tree } from "~/types"
	import debounce from "lodash/debounce"
	import { supabase } from "~/utils/supabase"

	const trees = ref<Tree[]>([])

	const filteredTrees = computed(() => {
		return trees.value
	})

	const center = reactive({ lat: 52.10054, lng: 5.12518 })

	const handleMapMove = debounce((c: L.LatLng | null) => {
		console.log(c)
		center.lat = c.lat
		center.lng = c.lng
		getTrees()
	}, 500)

	async function getTrees() {
		const offset = 0.001
		const { data } = await supabase
			.from("trees")
			.select()
			.gte("latitude", center.lat - offset)
			.lte("latitude", center.lat + offset)
			.gte("longitude", center.lng - offset)
			.lte("longitude", center.lng + offset)
		trees.value = data as Tree[]
	}

	onMounted(() => {
		getTrees()
	})
</script>
