#!/bin/bash
export ZFT_PUBLIC_PATH="http://statics.51dianxiaoge.com/"
export ZFT_BACKEND_PROXY="http://api.51dianxiaoge.com/"
npm i && npm run build -- --env=production
 

