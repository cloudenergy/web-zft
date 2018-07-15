let localUser = '';
try {
  localUser = JSON.parse(localStorage.user);
} catch (e) {
  localUser = {
    projectId: 100
  };
}

export default function userInfo() {
  localUser = '';
  if (localStorage.user !== undefined) {
    localUser = JSON.parse(localStorage.user);
  }
  return {
    user: {
      ...localUser
    },
    cityArea: {},
    houseTypes: {
      SOLE: ['SHARE', '合租'],
      SHARE: ['SOLE', '整租'],
      ENTIRE: ['ENTIRE', '整幢']
    },
    defaultHouseType: 'SOLE',
    othercost: null,
    successInfo: false,
    businessCity: [],
    businessArea: null,
    houseKeeper: null,
    index: 0,
    toward: [{
      EN: 'S',
      CH: '南'
    },
    {
      EN: 'N',
      CH: '北'
    },
    {
      EN: 'W',
      CH: '西'
    },
    {
      EN: 'E',
      CH: '东'
    },
    {
      EN: 'NE',
      CH: '东北'
    },
    {
      EN: 'SE',
      CH: '东南'
    },
    {
      EN: 'SW',
      CH: '西南'
    },
    {
      EN: 'NW',
      CH: '西北'
    }
    ]
  }
}
