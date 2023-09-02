<template>
 <v-dialog :model-value="showPolicyConfirmation" @click:outside="emits('update:showPolicyConfirmation', false)" width="450" >
      <v-card :loading="isLoading" :disabled="isLoading" class="rounded-lg">
        <v-card-text class="pa-5">
          <h3 class="mb-2">Do you want to apply the policy?</h3>

          <h4 class="font-weight-regular">
            Its seems the student comes late. Do you want apply the policy on this student?
          </h4>
          <!-- <v-alert variant="tonal" type="info" class="mt-2" density="compact">
            This will show every 9:16 above.
          </v-alert> -->
        </v-card-text>
        <v-card-actions class="bg-grey-lighten-4">
          <v-spacer></v-spacer>
          <v-btn
            variant="elevated" class="text-capitalize"

            size="small"
            color="warning"
            @click="emits('allow')"
            >Yes, Apply it</v-btn
          >
          <v-btn variant="elevated" class="text-capitalize" @click="emits('deny')"  size="small">No, Don't apply it</v-btn>
        </v-card-actions>
        <v-btn
          icon="mdi-close"
          variant="text"
          class="ma-1"
          size="small"
          @click="emits('update:showPolicyConfirmation', false)"
          style="position: absolute; top: 0; right: 0"
        ></v-btn>
      </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
const props = defineProps(['showPolicyConfirmation', 'student', 'isLoading'])
const emits = defineEmits(['update:showPolicyConfirmation', 'allow', 'deny']);

</script>

<style scoped>

</style>
