<script setup lang="ts">
import { ref } from 'vue'
import { Plus, Phone, Mail, MessageCircle } from 'lucide-vue-next'
import SettingSection from '../settings/SettingSection.vue'
import SettingToggle from '../settings/SettingToggle.vue'
import PrinterCard from '../settings/PrinterCard.vue'
import AddPrinterModal from '../settings/AddPrinterModal.vue'

interface Printer {
  id: number
  name: string
  type: 'Cocina' | 'Bar' | 'Caja'
  isActive: boolean
}

const MOCK_PRINTERS: Printer[] = [
  { id: 1, name: 'Cocina principal', type: 'Cocina', isActive: true },
  { id: 2, name: 'Bar 1', type: 'Bar', isActive: true },
  { id: 3, name: 'Caja principal', type: 'Caja', isActive: true },
  { id: 4, name: 'Cocina 2', type: 'Cocina', isActive: false },
]

type SettingTab = 'general' | 'ticket' | 'pagos' | 'impresoras' | 'seguridad' | 'soporte'

const TABS: { id: SettingTab; label: string }[] = [
  { id: 'general', label: 'General' },
  { id: 'ticket', label: 'Ticket' },
  { id: 'pagos', label: 'Pagos' },
  { id: 'impresoras', label: 'Impresoras' },
  { id: 'seguridad', label: 'Seguridad' },
  { id: 'soporte', label: 'Soporte' },
]

const activeTab = ref<SettingTab>('general')
const businessName = ref('La Santa Bar')
const businessAddress = ref('Av. Alejandro de la cruz Saucedo')
const businessPhone = ref('')

const ticketName = ref('La Santa Bar')
const ticketMessage = ref('¡Gracias por tu visita!')

const cashEnabled = ref(true)
const cardEnabled = ref(true)

const printers = ref<Printer[]>(MOCK_PRINTERS)
const isPrinterModalOpen = ref(false)
const editingPrinter = ref<Printer | null>(null)

const handleDeletePrinter = (id: number) => {
  printers.value = printers.value.filter(p => p.id !== id)
}

const handleSavePrinter = (printerData: { id?: number; name: string; type: 'Cocina' | 'Bar' | 'Caja' }) => {
  if (printerData.id) {
    printers.value = printers.value.map(p =>
      p.id === printerData.id ? { ...p, name: printerData.name, type: printerData.type } : p
    )
  } else {
    const newPrinter: Printer = {
      id: Math.max(...printers.value.map(p => p.id)) + 1,
      name: printerData.name,
      type: printerData.type,
      isActive: true,
    }
    printers.value = [...printers.value, newPrinter]
  }
  isPrinterModalOpen.value = false
  editingPrinter.value = null
}

const handleEditPrinter = (printer: Printer) => {
  editingPrinter.value = printer
  isPrinterModalOpen.value = true
}
</script>

<template>
  <div class="px-8 py-8">
    <!-- Tabs -->
    <div class="flex items-center mb-8 border-b border-border">
      <button
        v-for="tab in TABS"
        :key="tab.id"
        @click="activeTab = tab.id"
        :class="[
          'px-5 py-3 relative transition-all duration-200',
          activeTab === tab.id
            ? 'text-foreground'
            : 'text-muted-foreground hover:text-foreground'
        ]"
        style="font-size: 0.9375rem; font-weight: 500"
      >
        {{ tab.label }}
        <div
          v-if="activeTab === tab.id"
          class="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
          style="background-color: var(--brand)"
        />
      </button>
    </div>

    <div class="max-w-4xl">
      <SettingSection
        v-if="activeTab === 'general'"
        title="Negocio"
        description="Información básica del establecimiento"
      >
        <div class="space-y-4">
          <div>
            <label class="block text-foreground mb-2" style="font-size: 0.875rem; font-weight: 500">
              Nombre del negocio
            </label>
            <input v-model="businessName" class="w-full px-4 py-3 bg-input-background border border-border rounded-lg text-foreground" />
          </div>

          <div>
            <label class="block text-foreground mb-2" style="font-size: 0.875rem; font-weight: 500">
              Dirección
            </label>
            <input v-model="businessAddress" class="w-full px-4 py-3 bg-input-background border border-border rounded-lg text-foreground" />
          </div>

          <div>
            <label class="block text-foreground mb-2" style="font-size: 0.875rem; font-weight: 500">
              Teléfono
            </label>
            <input v-model="businessPhone" class="w-full px-4 py-3 bg-input-background border border-border rounded-lg text-foreground" />
          </div>
        </div>
      </SettingSection>

      <SettingSection
        v-if="activeTab === 'pagos'"
        title="Métodos de pago"
        description="Configura los métodos de pago disponibles"
      >
        <div class="divide-y divide-border">
          <SettingToggle label="Efectivo" :checked="cashEnabled" @change="val => cashEnabled = val" />
          <SettingToggle label="Tarjeta" :checked="cardEnabled" @change="val => cardEnabled = val" />
        </div>
      </SettingSection>

      <SettingSection
        v-if="activeTab === 'impresoras'"
        title="Impresoras"
        description="Administra las impresoras del sistema"
      >
        <div class="mb-4">
          <PrinterCard
            v-for="printer in printers"
            :key="printer.id"
            :name="printer.name"
            :type="printer.type"
            :isActive="printer.isActive"
            @edit="handleEditPrinter(printer)"
            @delete="handleDeletePrinter(printer.id)"
          />
        </div>

        <button
          @click="() => { editingPrinter = null; isPrinterModalOpen = true }"
          class="w-full px-4 py-3 rounded-lg border border-border text-foreground flex items-center justify-center gap-2"
        >
          <Plus class="w-4 h-4" />
          Agregar impresora
        </button>
      </SettingSection>

      <SettingSection
        v-if="activeTab === 'soporte'"
        title="Soporte"
        description="Contacta al equipo de soporte técnico"
      >
        <div class="space-y-4">
          <div class="flex items-center gap-3 py-2">
            <Phone class="w-5 h-5 text-muted-foreground" />
            <div>
              <a href="tel:4491025278">449 102 5278</a>
            </div>
          </div>

          <div class="flex items-center gap-3 py-2">
            <Mail class="w-5 h-5 text-muted-foreground" />
            <div>
              <a href="mailto:nexdevcode.startup@gmail.com">nexdevcode.startup@gmail.com</a>
            </div>
          </div>

          <button class="w-full px-4 py-3 rounded-lg text-white flex items-center justify-center gap-2" style="background-color: var(--brand)">
            <MessageCircle class="w-4 h-4" />
            Contactar soporte
          </button>
        </div>
      </SettingSection>
    </div>

    <AddPrinterModal
      :isOpen="isPrinterModalOpen"
      :editPrinter="editingPrinter"
      @close="() => { isPrinterModalOpen = false; editingPrinter = null }"
      @save="handleSavePrinter"
    />
  </div>
</template>
