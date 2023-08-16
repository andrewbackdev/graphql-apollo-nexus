import { enumType } from 'nexus'
import { asNexusMethod } from 'nexus'
import { DateTimeResolver } from 'graphql-scalars'

export const SortOrder = enumType({
  name: 'SortOrder',
  members: ['asc', 'desc'],
})

export const DateTime = asNexusMethod(DateTimeResolver, 'date')
