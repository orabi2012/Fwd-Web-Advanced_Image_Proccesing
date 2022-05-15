import {
  check,
  check_img_exist,
  check_img_size,
  check_img_name,
} from '../utilities/reqCheck';

import express from 'express';
//import path from 'path';

it('test for image name ', () => {
  expect(check_img_name(express.response, '-', '10', '10')).toEqual(
    'Image Not Found'
  );
});

