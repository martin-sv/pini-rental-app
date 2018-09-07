import { CheckIn } from '../shared/models/checkIn.model';
import { OrderEnum } from './oderEnum';

export class CheckinsHelper {

  static getPropertyCheckins(checkins: CheckIn[], idProperty: string, order: OrderEnum = OrderEnum.ASC, count = 1): CheckIn[] {
    let returnCheckins: CheckIn[] = [];

    checkins.forEach((checkin: CheckIn) => {
      if (checkin.idProperty === idProperty) { returnCheckins.push(checkin); }
    });

    returnCheckins.sort((c1, c2) => {
      return (c1.checkingDateTime > c2.checkingDateTime) ? 1 : -1;
    });
    if (order === OrderEnum.DESC) {
      returnCheckins.reverse();
    }

    if (count > 0) {
      returnCheckins = returnCheckins.slice(0, count);
    }

    return returnCheckins;
  }
}
