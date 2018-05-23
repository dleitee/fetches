import nodeFetch from 'node-fetch'
import FormData from 'form-data'

global.fetch = nodeFetch
global.FormData = FormData
