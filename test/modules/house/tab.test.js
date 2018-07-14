import {createLocalVue, shallowMount} from '@vue/test-utils'
import ElementUI from "element-ui";
import Tab from '../../../modules/house/tab'

const localVue = createLocalVue();
localVue.use(ElementUI);
localVue.component('el-table', ElementUI.ElTable);


describe('House tabs', () => {
  const options = {
    localVue,
    propsData: {
      form: {},
    },
    data: () => ({}),
    mocks: {
      $model: () => ({
        query: () => Promise.resolve({})
      }),
      $store: {
        state: {
          userInfo: {user: {projectId: 123}}
        },
        dispatch: async () => ({})
      }
    },
    stubs: ['city-area']
  };
  const wrapper = shallowMount(Tab, options);

  it('should extract communities', () => {
    expect(wrapper.vm.extractCommunities({
      "130300": {
        "districtId": "130300",
        "name": "秦皇岛市",
        "districts": {
          "130302": {
            "districtId": "130302",
            "name": "海港区",
            "communities": [{
              "geoLocationId": 6423523425708544000,
              "buildingId": "6423523425742098432",
              "name": "速8酒店(建设大街店)"
            }]
          }
        }
      }
    })).toEqual([{
      "buildingId": "6423523425742098432",
      "geoLocationId": 6423523425708544000,
      "name": "速8酒店(建设大街店)",
      cityId: '130300',
      areaId: '130302'
    }])
  });
  it('should extract complex communities', () => {
    expect(wrapper.vm.extractCommunities({
      "110100": {
        "districtId": "110100",
        "name": "市辖区",
        "districts": {
          "110102": {
            "districtId": "110102",
            "name": "西城区",
            "communities": [{
              "geoLocationId": "6423522932701663232",
              "buildingId": "6423522932743606272",
              "name": "荣丰2008"
            }]
          }
        }
      },
      "130200": {
        "districtId": "130200",
        "name": "唐山市",
        "districts": {
          "130202": {
            "districtId": "130202",
            "name": "路南区",
            "communities": [{
              "geoLocationId": "6423517752610394112",
              "buildingId": "6423517752660725760",
              "name": "唐山13363206121公寓(文化路与新华东道交叉口分店)"
            }]
          },
          "130208": {
            "districtId": "130208",
            "name": "丰润区",
            "communities": [{
              "geoLocationId": "6423492226369851392",
              "buildingId": "6423492226487291904",
              "name": "22小区"
            }]
          }
        }
      },
      "130300": {
        "districtId": "130300",
        "name": "秦皇岛市",
        "districts": {
          "130302": {
            "districtId": "130302",
            "name": "海港区",
            "communities": [{
              "geoLocationId": 6423523425708544000,
              "buildingId": "6423523425742098432",
              "name": "速8酒店(建设大街店)"
            }]
          }
        }
      }
    })).toEqual([{
      "buildingId": "6423522932743606272",
      "geoLocationId": "6423522932701663232",
      "name": "荣丰2008",
      cityId: '110100',
      areaId: '110102'
    }, {
      "buildingId": "6423517752660725760",
      "geoLocationId": "6423517752610394112",
      "name": "唐山13363206121公寓(文化路与新华东道交叉口分店)",
      cityId: '130200',
      areaId: '130202'
    }, {
      "buildingId": "6423492226487291904",
      "geoLocationId": "6423492226369851392",
      "name": "22小区",
      cityId: '130200',
      areaId: '130208'
    }, {
      "buildingId": "6423523425742098432",
      "geoLocationId": 6423523425708544000,
      "name": "速8酒店(建设大街店)",
      cityId: '130300',
      areaId: '130302'
    }])
  });
  it('should handle empty communities', () => {
    expect(wrapper.vm.extractCommunities([])).toEqual([])
  });
});
