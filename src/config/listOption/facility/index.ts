import { images } from '@assets/index'
import { listOptions } from '..'
import { FacilityDescriptionEnum } from '@config/constant/facilities'

export const FacilityOptions: {
	key: number
	name: keyof typeof FacilityDescriptionEnum
	image: any
} [] = [
	{
		key: 0,
		name: 'BC',
		image: images.badmintonCourt,
	},
	{
		key: 1,
		name: 'BBC',
		image: images.basketballCourt,
	},
	{
		key: 2,
		name: 'GR',
		image: images.gymRoom,
	},
]

export const GuestList: listOptions[] = [
	{
		key: 1,
		value: 1,
		label: '1 Guest',
	},
	{
		key: 2,
		value: 2,
		label: '2 Guests',
	},
	{
		key: 3,
		value: 3,
		label: '3 Guests',
	},
	{
		key: 4,
		value: 4,
		label: '4 Guests',
	},
	{
		key: 5,
		value: 5,
		label: '5 Guests',
	},
	{
		key: 6,
		value: 6,
		label: '6 Guests',
	},
	{
		key: 7,
		value: 7,
		label: '7 Guests',
	},
	{
		key: 8,
		value: 8,
		label: '8 Guests',
	},
	{
		key: 9,
		value: 9,
		label: '9 Guests',
	},
	{
		key: 10,
		value: 10,
		label: '10 Guests',
	},
]

export const BookingDurationList: listOptions[] = [
	{ key: 1, value: 1, label: '1 Hour' },
	{ key: 2, value: 2, label: '2 Hours' },
]
