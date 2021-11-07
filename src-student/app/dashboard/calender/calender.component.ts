import { Component, ChangeDetectionStrategy, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CalendarEvent } from 'angular-calendar';
@Component({
  selector: 'app-calender',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss']
})
export class CalenderComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }
  view: string = 'month';
  viewDate: Date = new Date();
  @Output() viewDateChange: EventEmitter<Date> = new EventEmitter();
  highSchoolEvents: Array<CalendarEvent<{ id: number }>> = [
    {
      title: 'Event 1',
      color: colors.yellow,
      start: new Date(),
      meta: {
        id: 1
      }
    },
    {
      title: 'Event 2',
      color: colors.blue,
      start: new Date(),
      meta: {
        id: 2
      }
    },
    {
      title: 'Event 3',
      color: colors.blue,
      start: new Date(),
      meta: {
        id: 3
      }
    },
    {
      title: 'Event 1',
      color: colors.green,
      start: new Date('04-04-2018'),
      meta: {
        id: 1
      }
    },
    {
      title: 'Event 2',
      color: colors.red,
      start: new Date('04-04-2018'),
      meta: {
        id: 2
      }
    },
    {
      title: 'Event 3',
      color: colors.yellow,
      start: new Date('04-04-2018'),
      meta: {
        id: 3
      }
    }
  ];
  undergradsEvents: Array<CalendarEvent<{ id: number }>> = [
    {
      title: 'Event 1',
      color: colors.yellow,
      start: new Date(),
      meta: {
        id: 1
      }
    },
    {
      title: 'Event 2',
      color: colors.blue,
      start: new Date(),
      meta: {
        id: 2
      }
    },
    {
      title: 'Event 3',
      color: colors.blue,
      start: new Date(),
      meta: {
        id: 3
      }
    },
    {
      title: 'Event 1',
      color: colors.green,
      start: new Date('04-04-2018'),
      meta: {
        id: 1
      }
    },
    {
      title: 'Event 2',
      color: colors.red,
      start: new Date('04-04-2018'),
      meta: {
        id: 2
      }
    },
    {
      title: 'Event 3',
      color: colors.yellow,
      start: new Date('04-04-2018'),
      meta: {
        id: 3
      }
    }
  ];
  mastersEvents: Array<CalendarEvent<{ id: number }>> = [
    {
      title: 'Event 1',
      color: colors.yellow,
      start: new Date(),
      meta: {
        id: 1
      }
    },
    {
      title: 'Event 2',
      color: colors.blue,
      start: new Date(),
      meta: {
        id: 2
      }
    },
    {
      title: 'Event 3',
      color: colors.blue,
      start: new Date(),
      meta: {
        id: 3
      }
    },
    {
      title: 'Event 1',
      color: colors.green,
      start: new Date('04-04-2018'),
      meta: {
        id: 1
      }
    },
    {
      title: 'Event 2',
      color: colors.red,
      start: new Date('04-04-2018'),
      meta: {
        id: 2
      }
    },
    {
      title: 'Event 3',
      color: colors.yellow,
      start: new Date('04-04-2018'),
      meta: {
        id: 3
      }
    }
  ];
  getDate() {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return monthNames[this.viewDate.getMonth()] + ' ' + this.viewDate.getFullYear();
  }
  openDialog(events): void {
    let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: events
    });
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
  styleUrls:['./calender.component.scss']
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

const colors: any = {
  red: {
    primary: 'rgba(255,120,0,.1)',
    secondary: '#ff7800'
  },
  blue: {
    primary: 'rgba(38,154,243,.1)',
    secondary: '#269af3'
  },
  green: {
    primary: 'rgba(27,185,52,.1)',
    secondary: '#1bb934'
  },
  yellow: {
    primary: 'rgba(240, 173, 78, 0.1)',
    secondary: '#f0ad4e'
  }
};