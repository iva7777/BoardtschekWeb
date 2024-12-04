import * as z from 'zod'

const rentalSchema = z.object({
  startDate: z.string(),
  startTime: z.string(),
  endDate: z.string(),
  endTime: z.string(),
  quantity: z.string()
})

export type RentalFormData = z.infer<typeof rentalSchema>

export async function rentGame(data: RentalFormData) {
  const result = rentalSchema.safeParse(data)

  if (!result.success) {
    return { success: false, message: 'Invalid form data' }
  }
  await new Promise(resolve => setTimeout(resolve, 1000))

  //TODO: Connect it to the database dont console log it
  console.log('Game rented:', result.data)

  return { success: true, message: 'Game rented successfully!' }
}
