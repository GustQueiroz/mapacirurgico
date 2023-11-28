import {
    NgModule, Component, ElementRef, OnDestroy, DoCheck, OnChanges, Input, Output,
    EventEmitter, IterableDiffers, OnInit, AfterViewChecked, SimpleChanges, Optional,
    Inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    RecursoServiceProxy, PagedResultDtoOfRecursoDto, RecursoDto,
    API_BASE_URL
} from 'shared/service-proxies/service-proxies';

declare var jQuery: any;

@Component({
    selector: 'p-schedule',
    template: '<div [ngStyle]="style" [class]="styleClass"></div>'
})
export class Schedule implements DoCheck, OnDestroy, OnInit, OnChanges, AfterViewChecked {

    @Input() events: any[];

    resources: RecursoDto[];

    @Input() header: any;

    @Input() buttonText: any;

    @Input() style: any;

    @Input() styleClass: string;

    @Input() rtl: boolean;

    @Input() weekends: boolean;

    @Input() hiddenDays: number[];

    @Input() fixedWeekCount: boolean;

    @Input() weekNumbers: boolean;

    @Input() businessHours: any;

    @Input() height: any;

    @Input() contentHeight: any;

    @Input() aspectRatio: number = 1.35;

    @Input() eventLimit: any;

    @Input() defaultDate: any;

    @Input() editable: boolean = true;

    @Input() droppable: boolean = true;

    @Input() eventStartEditable: boolean;

    @Input() eventDurationEditable: boolean;

    @Input() defaultView: string = 'timelineDay';

    @Input() allDaySlot: boolean = false;

    @Input() allDayText: string = 'all-day';

    @Input() slotDuration: any = '00:30:00';

    @Input() slotLabelInterval: any;

    @Input() snapDuration: any;

    @Input() scrollTime: any = '06:00:00';

    @Input() minTime: any = '00:00:00';

    @Input() maxTime: any = '24:00:00';

    @Input() slotEventOverlap: boolean = true;

    @Input() nowIndicator: boolean;

    @Input() dragRevertDuration: number = 500;

    @Input() dragOpacity: number = .75;

    @Input() dragScroll: boolean = true;

    @Input() eventOverlap: any;

    @Input() eventConstraint: any;

    @Input() locale: string;

    @Input() timezone: boolean | string = false;

    @Input() timeFormat: string | null = null;

    @Input() eventRender: Function;

    @Input() dayRender: Function;

    @Input() options: any;

    @Output() onDayClick: EventEmitter<any> = new EventEmitter();

    @Output() onDrop: EventEmitter<any> = new EventEmitter();

    @Output() onEventClick: EventEmitter<any> = new EventEmitter();

    @Output() onEventMouseover: EventEmitter<any> = new EventEmitter();

    @Output() onEventMouseout: EventEmitter<any> = new EventEmitter();

    @Output() onEventDragStart: EventEmitter<any> = new EventEmitter();

    @Output() onEventDragStop: EventEmitter<any> = new EventEmitter();

    @Output() onEventDrop: EventEmitter<any> = new EventEmitter();

    @Output() onEventResizeStart: EventEmitter<any> = new EventEmitter();

    @Output() onEventResizeStop: EventEmitter<any> = new EventEmitter();

    @Output() onEventResize: EventEmitter<any> = new EventEmitter();

    @Output() onViewRender: EventEmitter<any> = new EventEmitter();

    @Output() onViewDestroy: EventEmitter<any> = new EventEmitter();

    initialized: boolean;

    stopNgOnChangesPropagation: boolean;

    differ: any;

    schedule: any;

    config: any;

    private baseUrl: string = undefined;

    constructor(public el: ElementRef, differs: IterableDiffers,
        private _recursoService: RecursoServiceProxy,
        @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.differ = differs.find([]).create(null);
        this.initialized = false;
        this.baseUrl = baseUrl ? baseUrl : '';
    }

    ngOnInit() {

        this.config = {
            schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
            views: {

                timelineThreeDays: {
                    type: 'timeline',
                    duration: { days: 3 }
                },
                agendaTwoDay: {
                    type: 'agenda',
                    duration: { days: 2 },

                    // views that are more than a day will NOT do this behavior by default
                    // so, we need to explicitly enable it
                    //groupByResource: true

                    //// uncomment this line to group by day FIRST with resources underneath
                    groupByDateAndResource: true
                }
            },
            events: this.events,
            resources: {
                url: this.baseUrl + '/api/services/app/Recurso/GetAllNoPaging'
            },
            resourceLabelText: 'Salas',
            eventResizableFromStart: false,
            //theme: true,
            //themeSystem: 'bootstrap3',
            header: this.header,
            buttonText: this.buttonText,
            isRTL: this.rtl,
            weekends: this.weekends,
            hiddenDays: this.hiddenDays,
            fixedWeekCount: this.fixedWeekCount,
            weekNumbers: this.weekNumbers,
            businessHours: this.businessHours,
            height: this.height,
            contentHeight: this.contentHeight,
            aspectRatio: this.aspectRatio,
            eventLimit: this.eventLimit,
            defaultDate: this.defaultDate,
            locale: this.locale,
            timezone: this.timezone,
            timeFormat: this.timeFormat,
            editable: this.editable,
            droppable: this.droppable,
            eventStartEditable: this.eventStartEditable,
            eventDurationEditable: this.eventDurationEditable,
            defaultView: this.defaultView,
            allDaySlot: this.allDaySlot,
            allDayText: this.allDayText,
            slotDuration: this.slotDuration,
            slotLabelInterval: this.slotLabelInterval,
            snapDuration: this.snapDuration,
            scrollTime: this.scrollTime,
            minTime: this.minTime,
            maxTime: this.maxTime,
            slotEventOverlap: this.slotEventOverlap,
            nowIndicator: this.nowIndicator,
            dragRevertDuration: this.dragRevertDuration,
            dragOpacity: this.dragOpacity,
            dragScroll: this.dragScroll,
            eventOverlap: this.eventOverlap,
            eventConstraint: this.eventConstraint,
            eventRender: this.eventRender,
            dayRender: this.dayRender,
            dayClick: (date, jsEvent, view, resource) => {
                this.onDayClick.emit({
                    'date': date,
                    'jsEvent': jsEvent,
                    'view': view,
                    'resource': resource
                });
            },
            drop: (date, jsEvent, ui, resourceId) => {
                this.onDrop.emit({
                    'date': date,
                    'jsEvent': jsEvent,
                    'ui': ui,
                    'resourceId': resourceId
                });
            },
            eventClick: (calEvent, jsEvent, view) => {
                this.onEventClick.emit({
                    'calEvent': calEvent,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventMouseover: (calEvent, jsEvent, view) => {
                this.onEventMouseover.emit({
                    'calEvent': calEvent,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventMouseout: (calEvent, jsEvent, view) => {
                this.onEventMouseout.emit({
                    'calEvent': calEvent,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventDragStart: (event, jsEvent, ui, view) => {
                this.onEventDragStart.emit({
                    'event': event,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventDragStop: (event, jsEvent, ui, view) => {
                this.onEventDragStop.emit({
                    'event': event,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventDrop: (event, delta, revertFunc, jsEvent, ui, view) => {
                this._updateEvent(event);

                this.onEventDrop.emit({
                    'event': event,
                    'delta': delta,
                    'revertFunc': revertFunc,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventResizeStart: (event, jsEvent, ui, view) => {
                this.onEventResizeStart.emit({
                    'event': event,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventResizeStop: (event, jsEvent, ui, view) => {
                this.onEventResizeStop.emit({
                    'event': event,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            eventResize: (event, delta, revertFunc, jsEvent, ui, view) => {
                this._updateEvent(event);

                this.onEventResize.emit({
                    'event': event,
                    'delta': delta,
                    'revertFunc': revertFunc,
                    'jsEvent': jsEvent,
                    'view': view
                });
            },
            viewRender: (view, element) => {
                this.onViewRender.emit({
                    'view': view,
                    'element': element
                });
            },
            viewDestroy: (view, element) => {
                this.onViewDestroy.emit({
                    'view': view,
                    'element': element
                });
            }
        };



        if (this.options) {
            for (let prop in this.options) {
                this.config[prop] = this.options[prop];
            }
        }
    }

    ngAfterViewChecked() {
        if (!this.initialized && this.el.nativeElement.offsetParent) {
            this.initialize();
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.schedule) {
            let options = {};
            for (let change in changes) {
                if (change !== 'events') {
                    options[change] = changes[change].currentValue;
                }
            }

            if (Object.keys(options).length) {
                this.schedule.fullCalendar('option', options);
            }
        }
    }

    initialize() {
        // if(this.resources == null) {
        //   this._recursoService.getAll('', 0, 1000)
        //   .subscribe((resultRecursos: PagedResultDtoOfRecursoDto) => {
        //     this.resources = resultRecursos.items;

        //     this.schedule = jQuery(this.el.nativeElement.children[0]);
        //     this.schedule.fullCalendar(this.config);
        //     this.schedule.fullCalendar('addEventSource', this.events);
        //     this.initialized = true;
        //   });
        // } else {
        this.schedule = jQuery(this.el.nativeElement.children[0]);
        this.schedule.fullCalendar(this.config);
        this.schedule.fullCalendar('addEventSource', this.events);
        this.initialized = true;
        //}

    }

    carregarRecursos() {
        this._recursoService.getAll('', 0, 1000)
            .subscribe((resultRecursos: PagedResultDtoOfRecursoDto) => {
                this.resources = resultRecursos.items;
            });
    }

    ngDoCheck() {
        let changes = this.differ.diff(this.events);

        if (this.schedule && changes) {
            //this.schedule.fullCalendar({ resource: this.resources});
            this.schedule.fullCalendar('removeEventSources');
            this.schedule.fullCalendar('addEventSource', this.events);
        }
    }

    ngOnDestroy() {
        jQuery(this.el.nativeElement.children[0]).fullCalendar('destroy');
        this.initialized = false;
        this.schedule = null;
    }

    gotoDate(date: any) {
        this.schedule.fullCalendar('gotoDate', date);
    }

    prev() {
        this.schedule.fullCalendar('prev');
    }

    next() {
        this.schedule.fullCalendar('next');
    }

    prevYear() {
        this.schedule.fullCalendar('prevYear');
    }

    nextYear() {
        this.schedule.fullCalendar('nextYear');
    }

    today() {
        this.schedule.fullCalendar('today');
    }

    incrementDate(duration: any) {
        this.schedule.fullCalendar('incrementDate', duration);
    }

    changeView(viewName: string) {
        this.schedule.fullCalendar('changeView', viewName);
    }

    getDate() {
        return this.schedule.fullCalendar('getDate');
    }

    updateEvent(event: any) {
        this.schedule.fullCalendar('updateEvent', event);
    }

    _findEvent(id: string) {
        let event;
        if (this.events) {
            for (let e of this.events) {
                if (e.id === id) {
                    event = e;
                    break;
                }
            }
        }
        return event;
    }

    _updateEvent(event: any) {
        let sourceEvent = this._findEvent(event.id);
        if (sourceEvent) {
            sourceEvent.start = event.start.format();
            if (event.end) {
                sourceEvent.end = event.end.format();
            }
        }
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [Schedule],
    declarations: [Schedule]
})
export class DexSchedulerModuleModule { }