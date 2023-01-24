import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// https://vitejs.dev/config/
import basicSsl from '@vitejs/plugin-basic-ssl'

export default defineConfig({
	define: {
		'process.env': process.env
	},
	plugins: [react(), basicSsl()],
	build: {
		lib: {
			formats: ['es'],
			fileName: process.env.npm_config_component,
			entry: `./src/components/${process.env.npm_config_component}/index.tsx`,

		},

	}

})
