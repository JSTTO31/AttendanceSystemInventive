<!-- $table->id();
$table->string('first_name');
$table->string('last_name');
$table->string('image');
$table->string('gender');
$table->string('email')->unique();
$table->integer('phone_number');
$table->string('school_name');
$table->string('school_year');
$table->string('address');
$table->string('course');
$table->integer('remaining')->default(550); -->
<template>
 <v-card class="pa-5">
    <h2 class="mb-5">Student information</h2>

    <v-row>
      <v-col cols="3">Profile Image</v-col>
      <v-col>
        <v-card width="150" class="rounded-lg">
          <v-img src="https://drehomes.com/wp-content/uploads/dummy-image.jpeg"></v-img>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div>
          <label for="" class="mb-5">First name</label>
          <v-text-field class="mt-2" density="compact" variant="underlined" label="First name"></v-text-field>
        </div>
      </v-col>
      <v-col>
        <div>
          <label for="" class="mb-5">First name</label>
          <v-text-field class="mt-2" density="compact" variant="underlined" label="First name"></v-text-field>
        </div>
      </v-col>
    </v-row>
 </v-card>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>
