import { Prisma } from '@prisma/client'

// Type exports for use throughout the app
export type Person = Prisma.PersonGetPayload<{}>
export type PersonWithCompany = Prisma.PersonGetPayload<{
  include: { company: true }
}>
export type PersonWithRelations = Prisma.PersonGetPayload<{
  include: {
    company: true
    eventPeople: { include: { event: true } }
    interactions: true
  }
}>

export type Company = Prisma.CompanyGetPayload<{}>
export type CompanyWithPeople = Prisma.CompanyGetPayload<{
  include: { people: true }
}>

export type Event = Prisma.EventGetPayload<{}>
export type EventWithSource = Prisma.EventGetPayload<{
  include: { source: true }
}>
export type EventWithPeople = Prisma.EventGetPayload<{
  include: {
    eventPeople: { include: { person: true } }
  }
}>

export type EventSource = Prisma.EventSourceGetPayload<{}>

export type EventPerson = Prisma.EventPersonGetPayload<{}>

export type NetworkingInteraction = Prisma.NetworkingInteractionGetPayload<{}>
export type NetworkingInteractionWithPerson = Prisma.NetworkingInteractionGetPayload<{
  include: { person: true }
}>
