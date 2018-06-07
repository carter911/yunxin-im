import http from '../utils/http'
import types from './types'

export default {
    supplierBanner: function (supplierId) {
        var params = {supplierId: supplierId}
        http.get(types.SUPPLIERBANNER, params).then(function (res) {
            if (res.code === 200) {
                this.state.supplierBanner = res.data
            }
        }).catch(function (err) {
            console.log(err)
        })
    }
}
