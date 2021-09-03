const env = process.env.NODE_ENV || 'development';

const config = {
	development: {
		server: {
			port: process.env.APP_PORT || 8000,
			env
		},
		db: {
			client: 'pg',
			connection: {
				host : process.env.APP_HOST || '127.0.0.1',
				user : process.env.DB_USER || 'postgres',
				password : process.env.DB_PASS || 'postgres',
				database : process.env.DB_NAME || 'postgres'
			}
		}
	},
	test: {
		server: {
			port: process.env.APP_PORT || 8000,
			env
		},
		db: {
			client: 'pg',
			connection: {
				host : process.env.APP_HOST || '127.0.0.1',
				user : process.env.TEST_DB_USER || 'postgres',
				password : process.env.TEST_DB_PASS || 'postgres',
				database : process.env.TEST_DB_NAME || 'test'
			}
		}
	}
}

module.exports = config[env];