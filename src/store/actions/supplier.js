import store from '../'
import http from '../../utils/http'
import types from '../../api/types'

export function getSupplierBanner ({state, commit}, supplierId) {
    var params = {supplierId: supplierId}
        http.get(types.SUPPLIERBANNER, params).then(function (res) {
            if (res.code === 200) {
                store.commit('getSupplierBanner', res.data)
            }
        }).catch(function (err) {
            console.log(err)
        })
}

export function getGoods ({state, commit}, supplierId, pageIndex = 1, pageSize = 20) {
        var params = {supplierId: supplierId, pageIndex: pageIndex, pageSize: pageSize}
        http.get(types.SUPPLIERGOODS, params).then(function (res) {
            if (res.code === 200) {
                store.commit('getGoods', res.data)
            }
        }).catch(function (err) {
            console.log(err)
        })
}

export function getGoodsDetail ({state, commit}, params) {
    http.get(types.SUPPLIERGOODSINFO, params).then(function (res) {
        if (res.code === 200) {
            store.commit('getGoodsDetail', res.data)
        }
    }).catch(function (err) {
        console.log(err)
    })
}