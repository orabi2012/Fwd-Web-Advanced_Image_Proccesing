import img_processing from '../../utilities/utilities';

describe('Create Image with sharp', function () {
  it('check img_processing => true', async () => {
    const imgName = 'fjord';
    const height = '100';
    const width = '100';

    const create_: boolean = await img_processing(imgName, height, width);
    expect(create_).toBe(true);
    //done();
  });
});
