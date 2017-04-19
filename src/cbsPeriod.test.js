import { parseCbsPeriod } from './cbsPeriod';

const snapShotTestCbsPeriodParsing = (description, cbsPeriodString) => {
    test(`CBS Period - ${description}`, () => {
        const { type, startDate, endDate, format } = parseCbsPeriod(cbsPeriodString);
        const formattedDate = format();
        const result = {
            input: cbsPeriodString,
            type,
            startDate: startDate.toString(),
            endDate: endDate.toString(),
            formattedDate,
        };
        expect(result).toMatchSnapshot();
    });
};

const cbsPeriodTests = [
    ['Dagen', '20150325'],
    ['Jaar', '2015JJ00'],
    ['Maanden', '2001MM06'],
    ['Kwartalen', '2017KW04'],
    ['School-, Bouw-, Oogstjaar', '2012SJ00'],
];

cbsPeriodTests.forEach((t) => snapShotTestCbsPeriodParsing(...t));