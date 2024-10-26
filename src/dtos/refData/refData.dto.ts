export interface GetPropertyDto {
	floorId: string
	units: {
		unitId: string
		isAssigned: boolean
		assignedTo: string | null
	}[]
}
