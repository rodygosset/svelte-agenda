<script lang="ts">

  import "@fontsource/raleway"
  import Header from "./components/layout/header.svelte";




</script>

<style lang="scss">

	@import "./styles/base/_mixins.scss";

	main {
		@include flex-container(column, nowrap, flex-start, stretch);
	}

</style>

<Header />

<main>



</main>