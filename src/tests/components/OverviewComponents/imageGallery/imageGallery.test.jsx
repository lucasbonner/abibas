import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import ImageGallery from '../../../../components/OverviewComponents/imageGallery/ImageGallery.jsx';
import 'regenerator-runtime/runtime';

const sleep = (ms) => new Promise((res, rej) => {
  setTimeout(() => {
    res();
  }, ms);
})

describe("ImageGallery", () => {
  const mount = (overrides = {}) => {
    const testData = {
      selectedStyle: { photos: [{ url: 'asdf', thumbnail_url: 'lkjh' }, { url: 'qwer', thumbnail_url: 'poiu' }, { url: 'zxcv', thumbnail_url: 'mnbv' }], style_id: 'not equal' },
      thumbnailStart: 0,
      thumbnailEnd: 6,
      mainImageIdx: 0,
      styleHistory: {},
      loaded: true,
      productId: 12345,
    };

    const props = {
      ...testData,
      ...overrides,
    };

    return render(
      <ImageGallery {...props} />
    );
  };

  it('should toggle DefaultView and ModalZoom when clicked', async () => {
    const { debug } = mount();

    const mainImage = screen.getByAltText("selected image");

    expect(screen.queryByAltText("zoomed image")).toBeNull();

    fireEvent.click(mainImage);

    await screen.findByAltText("zoomed image");

    const modal = screen.getByTestId("main-image-modal");
    const closeBtn = screen.getByTestId("btn__close-modal");
    fireEvent.click(closeBtn);
    expect(screen.queryByTestId("main-image-modal")).toBeNull();
  })

  // it('should toggle from ModalZoom to DefaultView when closed', async () => {
  //   const { container, debug } = mount({ expanded: true });
  //   // debug()

  //   // debug();
  //   await sleep(2000);

  // })
})