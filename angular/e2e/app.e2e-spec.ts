import { MapaCirurgicoTemplatePage } from './app.po';

describe('MapaCirurgico App', function() {
  let page: MapaCirurgicoTemplatePage;

  beforeEach(() => {
    page = new MapaCirurgicoTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
