import { IType } from '@config/constant'

export const listUrl = {
	auth: {
		logIn: {
			path: 'auth/login',
			type: IType.post,
		},
		signUp: {
			path: 'auth/signup',
			type: IType.post,
		},
		resetPassword: {
			path: 'auth/reset-password',
			type: IType.post,
		},
		requestPasswordReset: {
			path: 'auth/reset-password/request',
			type: IType.post,
		},
		checkAuth: {
			path: 'auth/check',
			type: IType.get,
		},
	},
	faceAuth: {
		upload: {
			path: 'face-auth',
			type: IType.post,
		},
	},
	users: {
		create: {
			path: 'users',
			type: IType.post,
		},
		getById: {
			path: 'users/details',
			type: IType.get,
		},
		update: {
			path: 'users',
			type: IType.put,
		},
		createSubUser: {
			path: 'users/sub',
			type: IType.post,
		},
		getSubUsers: {
			path: 'users/sub',
			type: IType.get,
		},
		updateSubUserStatus: {
			path: 'users/sub/:id',
			type: IType.put,
		},
		deleteSubUser: {
			path: 'users/sub/:id',
			type: IType.delete,
		},
	},
	facilities: {
		book: {
			path: 'facilities/',
			type: IType.post,
		},
		getBookingHistory: {
			path: 'facilities/',
			type: IType.get,
		},
		getById: {
			path: 'facilities/:id/details',
			type: IType.get,
		},
		cancelBooking: {
			path: 'facilities/:id/cancel',
			type: IType.put,
		},
		checkAvailability: {
			path: 'facilities/availability',
			type: IType.get,
		},
	},
	notices: {
		getAll: {
			path: 'notices',
			type: IType.get,
		},
		getById: {
			path: 'notices/:id/details',
			type: IType.get,
		}
	},
	visitors: {
		create: {
			path: 'visitors',
			type: IType.post,
		},
		getAll: {
			path: 'visitors',
			type: IType.get,
		},
		update: {
			path: 'visitors/:id',
			type: IType.put,
		},
		getById: {
			path: 'visitors/:id/details',
			type: IType.get,
		},
	},
	refData: {
		getProperties: {
			path: 'ref-data/properties',
			type: IType.get,
		},
	},
	parcels: {
		getAll: {
			path: 'parcels',
			type: IType.get,
		},
	},
	notifications: {
		getAll: {
			path: 'notifications',
			type: IType.get,
		},
	},
	cards: {
		getQrCode: {
			path: 'cards/qr-code',
			type: IType.get,
		}
	}
}
