import { moroccoRegionDistrict } from './enum';

export const citiesSercices = {
  getAreaList() {
    return moroccoRegionDistrict.map((area) => area.area);
  },
  getDistrictList(area: string) {
    const areaObject = moroccoRegionDistrict.find(
      (areaObject) => areaObject.area === area,
    );
    if (!areaObject) {
      return [];
    }
    return areaObject.district;
  },
};
