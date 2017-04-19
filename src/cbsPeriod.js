import {addYears, addMonths, endOfYear, endOfMonth, endOfDay, format, parse} from 'date-fns';
import nlLocale from 'date-fns/locale/nl';

const formatDate = (date, formatTemplate) =>  format(date, formatTemplate, {locale: nlLocale});

const splitCbsPeriodString = (cbsPeriodString) => ({
    year: cbsPeriodString.slice(0, 4),
    part1: cbsPeriodString.slice(4, 6),
    part2: cbsPeriodString.slice(6, 8),
});

const createDate = ({
    year, month = 0, day = 1, hours = 0, minutes = 0, seconds = 0, milliseconds = 0,
}) => new Date(year, month, day, hours, minutes, seconds, milliseconds);

// Convert to zero based
const zeroBased = (index) => Number(index) - 1;
const regexMatcher = (regex) => ({part1}) => regex.test(part1);
const stringMatcher = (string) => ({part1}) => string === part1;

// All supported cbsPeriods
const cbsPeriodTypes = [
    {
        match: regexMatcher(/^\d\d$/),
        parse: ({year, part1, part2}) => {
            const startDate = createDate({year, month: zeroBased(part1), day: part2});
            const endDate = endOfDay(startDate);
            return {
                type: 'Dagen',
                startDate,
                endDate,
                format: () => formatDate(startDate, 'D MMM YYYY'),
            };
        },
    },
    {
        match: stringMatcher('JJ'),
        parse: ({year}) => {
            const startDate = createDate({year});
            const endDate = endOfYear(startDate);
            return {
                type: 'Jaar',
                startDate,
                endDate,
                format: () => formatDate(startDate, 'YYYY'),                
            };
        }
    },
    {
        match: stringMatcher('MM'),
        parse: ({year, part2}) => {
            const startDate = createDate({year, month: zeroBased(part2)});
            const endDate = endOfMonth(startDate);
            return {
                type: 'Maanden',
                startDate,
                endDate,
                format: () => formatDate(startDate, 'MMM YYYY'),                
            };
        },
    },
    {
        match: stringMatcher('KW'),
        parse: ({year, part2}) => {
            const startDate = createDate({year, month: zeroBased(part2) * 3});
            const endDate = endOfMonth(addMonths(startDate, 2)); // End of month adds the third month of the quarter
            return {
                type: 'Kwartalen',
                startDate,
                endDate,
                format: () => formatDate(startDate, 'YYYY [Q]Q'),                
            };
        }
    },
    {
        match: stringMatcher('SJ'),
        parse: ({year}) => {
            const startDate = createDate({year, month: 7, day: 1});
            const endDate = endOfMonth(addYears(createDate({year, month: 6}), 1));
            return {
                type: 'School-, Bouw-, Oogstjaar',
                startDate,
                endDate,
                format: () => `${formatDate(startDate, 'YYYY')}/${formatDate(endDate, 'YYYY')}`,                
            };
        },
    },
    {
        match: stringMatcher('HJ'),
        parse: ({year, part2}) => {
            const startMonth = zeroBased(part2) * 6;
            const startDate = createDate({year, month: startMonth});
            const endDate = endOfMonth(addMonths(startDate, 6));

            return {
                type: 'Half jaar',
                startDate,
                endDate,
                format: () => `${formatDate(startDate, 'YYYY')} ${part2 === '01' ? 'eerste helft' : 'tweede helft'}`,                
            };
        },
    },
    {
        match: stringMatcher('W1'),
        parse: ({year, part2}) => {
            return {
                type: 'Week, systeem 1',        
            };
        },
    },
    {
        match: stringMatcher('W4'),
        parse: ({year, part2}) => {
            return {
                type: 'Week, vier weken',        
            };
        },
    },
    {
        match: stringMatcher('VS'),
        parse: ({year, part2}) => {
            return {      
                type: 'Voorschijdende maanden',
            };
        },
    },
    {
        match: stringMatcher('G2'),
        parse: ({year, part2}) => {
            return {      
                type: '2-jaarsgemiddelde',
            };
        },
    },
    {
        match: stringMatcher('G3'),
        parse: ({year, part2}) => {
            return {      
                type: '3-jaarsgemiddelde',
            };
        },
    },
    {
        match: stringMatcher('G4'),
        parse: ({year, part2}) => {
            return {      
                type: '4-jaarsgemiddelde',
            };
        },
    },
    {
        match: stringMatcher('G5'),
        parse: ({year, part2}) => {
            return {      
                type: '5-jaarsgemiddelde',
            };
        },
    },
    {
        match: regexMatcher(/^X.$/),
        parse: ({year, part2}) => {
            return {      
                type: 'Geen officiële periode indeling',
            };
        },
    },
    {
        match: stringMatcher('VJ'),
        parse: ({year, part2}) => {
            return {      
                type: 'Voortschrijdend jaar',
            };
        },
    },
    {
        match: stringMatcher('M3'),
        parse: ({year, part2}) => {
            return {      
                type: '3 maandelijks gemiddelde',
            };
        },
    },
];

export const parseCbsPeriod = (cbsPeriodString) => {
    const cbsPeriod = splitCbsPeriodString(cbsPeriodString);

    const {parse} = cbsPeriodTypes.find(({match}) => match(cbsPeriod));

    return parse(cbsPeriod);
};