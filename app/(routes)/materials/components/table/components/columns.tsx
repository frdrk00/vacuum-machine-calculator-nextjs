'use client'

import { ColumnDef } from '@tanstack/react-table'
import { RowActions } from './row-actions'
import { ColumnHeader } from './column-header'
import { types } from '../data/data'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'

export type Material = {
  id: string
  type: 'dry' | 'liquid' | 'addition' | 'other'
  title: string
  quantity: number
}

export const columns: ColumnDef<Material>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: 'title',
    header: 'Title',
  },

  {
    accessorKey: 'type',
    header: ({ column }) => <ColumnHeader column={column} title="Type" />,
    cell: ({ row }) => {
      const label = types.find((label) => label.value === row.original.type)

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
        </div>
      )
    },
  },

  {
    accessorKey: 'quantity',
    header: 'Quantity',
  },

  {
    accessorKey: 'Actions',
    id: 'actions',
    cell: ({ row }) => <RowActions row={row} />,
  },
]
