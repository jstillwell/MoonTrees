import { MoonTreesPage } from './app.po';

describe('moon-trees App', () => {
  let page: MoonTreesPage;

  beforeEach(() => {
    page = new MoonTreesPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
