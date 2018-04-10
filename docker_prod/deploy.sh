#!/bin/bash
export ZFT_PUBLIC_PATH="https://statics.51dianxiaoge.com/"
export ZFT_BACKEND_PROXY="https://api.51dianxiaoge.com"
npm i && npm run build -- --env=production
 

