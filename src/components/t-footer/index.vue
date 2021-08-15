<template>
  <footer class="footer">
    <t-container>
      <div class="legal">
        <p class="text-xs pb-2">
          The artwork on the home page is property of Wizards of the Coast LLC, and was illustrated by Jung Park.
        </p>
        <p class="text-xs pb-2">
          Nykthos is unofficial Fan Content permitted under the Fan Content Policy. Not approved/endorsed by Wizards. Portions of the materials used are property of Wizards of the Coast. ©Wizards of the Coast LLC.
        </p>
        <p class="text-xs pb-2">
          Wizards of the Coast, Magic: The Gathering, and their respective logos are trademarks or registered trademarks of Wizards and its affiliates in the United States and elsewhere. © 1993-2021 Wizards of the Coast LLC, a subsidiary of Hasbro, Inc. All Rights Reserved.
        </p>
        <p class="text-xs pb-2">
          Berserk Games, Tabletop Simulator, and their respective logos are trademarks or registered trademarks of Berserk Games. © 2014-2020 Berserk Games. All Rights Reserved.
        </p>
        <p class="text-xs pb-2">
          All card data and artwork is sourced from
          <t-link href="https://scryfall.com/">
            Scryfall
          </t-link>.
        </p>
        <p class="text-xs pb-2">
          Nykthos is not produced by, endorsed by, supported by, or affiliated with Wizards of the Coast, Berserk Games, or Scryfall.
        </p>
        <p class="text-xs">
          © 2021 Nykthos LLC.
        </p>
      </div>
    </t-container>
  </footer>
</template>

<script>
import TContainer from "../t-container/index.vue";
import TLink from '../t-link/index.vue';

export default {
  name: "TFooter",
  components: {
    TContainer,
    TLink
  }
}
</script>

<style scoped>
  .footer {
    @apply py-4 bg-gray-900 text-gray-200
  }
</style>
