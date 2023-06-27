<template>
 <v-dialog :model-value="showPolicyConfirmation" @click:outside="emits('update:showPolicyConfirmation', false)" width="450" >
      <v-card :loading="isLoading" :disabled="isLoading">
        <v-card-text>
          <h4 class="mb-3 text-warning d-flex align-center">
            <v-icon class="mr-1">mdi-information-outline</v-icon>Policy Alert
            <v-spacer></v-spacer>
          </h4>
          <h4 class="font-weight-regular">
            Its seems the student comes late. Do you want apply the policy on this student?
          </h4>
          <!-- <v-alert variant="tonal" type="info" class="mt-2" density="compact">
            This will show every 9:16 above.
          </v-alert> -->
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            variant="elevated" class="text-capitalize"
            flat
            density="compact"
            color="primary"
            @click="emits('allow')"
            >Yes, Apply it</v-btn
          >
          <v-btn variant="elevated" class="text-capitalize" @click="emits('deny')" flat density="compact">No, Don't apply it</v-btn>
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
