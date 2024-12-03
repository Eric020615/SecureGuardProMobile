import { GenderDescriptionEnum } from '@config/constant/user'

export const GenderOptions: {
	key: number
	label: GenderDescriptionEnum
	value: keyof typeof GenderDescriptionEnum
}[] = [
	{
		key: 0,
		label: GenderDescriptionEnum.M,
		value: 'M',
	},
	{
		key: 1,
		label: GenderDescriptionEnum.F,
		value: 'F',
	},
]
