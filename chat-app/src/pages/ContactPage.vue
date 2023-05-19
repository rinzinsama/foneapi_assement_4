<template>
    <div class="q-pa-md">
        <div class="row">
            <div class="col-4">
                <q-card class="q-pa-lg">
                    <q-input filled dense v-model="text" label="Name" class="q-pa-xs" />
                    <q-input filled dense v-model="text" label="Email Address" class="q-pa-xs" />
                    <q-btn label="Add Contact" size="sm" icon="contacts" color="blue-6" class="q-pa-xs q-mt-sm" />
                </q-card>
            </div>
        </div>
        <div class="row">
            <div class="col-8 q-mt-md"><q-table flat bordered title="Contact List" dense :rows="rows" :columns="columns"
                    row-key="name" /></div>

        </div>
    </div>
</template>
  
<script>
const columns = [
    {
        name: 'name',
        required: true,
        label: 'ID',
        align: 'left',
        field: row => row.name,
        format: val => `${val}`,
        sortable: true
    },
    { name: 'name', align: 'left', label: 'name', field: 'name', sortable: true },
    { name: 'email',align: 'left', label: 'email', field: 'email', sortable: true },
    
]

const rows = [
    {
        id: 1,
        name: 'Jhhn Doe ',
        email: 'jd@gmail.com',

    },
    {
        id: 1,
        name: 'Jhhn Doe ',
        email: 'jd@gmail.com',

    },

]

export default {
    setup() {
        return {
            columns,
            rows
        }
    }
}
</script>
  