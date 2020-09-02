import moment from 'moment';

// export const base_url = 'http://192.168.29.55:5000/api';
export const base_url = 'http://192.168.29.55:5000/api';

export const EventEmmitter = {
    events: new Map(),
    dispatch: function(event: number, data: any) {
        if (this.events.get(event)) {
            return this.events.get(event).forEach((callback: any) => callback(data))
        }
    },
    subscribe: function(event: number, callback: any) {
        if (!this.events.get(event)) this.events.set(event, [])
        this.events.get(event).push(callback);
        return {name: event, id: this.events.get(event).length};
    },
    unsubscribe: function(event: any) {
        if (!this.events.get(event.name))
        return false;
        if (!this.events.get(event.name)[event.id - 1])
        return false;
        this.events.get(event.name).splice(event.id - 1, 1);
        return true;
    }
}

export enum EventNames {
    closeNavigationDrawer,
    openNavigationDrawer,
    changeSubtitle
}

export enum BatchDays {
    Monday = "Monday",
    Tuesday = "Tuesday",
    Wednesday = "Wednesday",
    Thursday = "Thursday",
    Friday = "Friday",
    Saturday = "Saturday",
    Sunday = "Sunday"
}

export function getBatchDates(day: BatchDays) {
    let dates = [];
    let startDate = moment(moment.now()).startOf('month').day(day);
    let date = startDate.clone();
    while(date.month() === startDate.month()) {
        dates.push(date.format('D MMM YY'));
        date.add(7, 'days');
    }
    return dates;
}
