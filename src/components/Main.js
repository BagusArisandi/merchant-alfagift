import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Modal, Button } from 'react-bootstrap';
import Merchants from '../merchantData';
import Citys from '../cityData';
import Carousel from '../carouselData';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Main = () => {
  const [countTotalMerchant, setCountTotalMerchant] = useState('');
  const loadDataOnlyOnce = () => {
    const totalData = Merchants.filter(data =>
      data.category === 'penginapan'
    );
    console.log(totalData.length);
    setCountTotalMerchant(totalData.length);
  }
  useEffect(() => {
    loadDataOnlyOnce();
  }, [])

  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    if (value === '') {
      setResults([]);
    } else {
      const filteredMerchants = Merchants.filter(list =>
        list.name.toLowerCase().includes(value)
        // list.loc.toLowerCase().includes(value)
        // list.tnc.map(tc => tc.toLowerCase()).includes(value)
      );

      setResults(filteredMerchants);
    }
  };

  const onInput = (e) => setSearchTerm(e.target.searchTerm);
  const onClear = () => {
    setSearchTerm("");
    if (setSearchTerm === '') {
      setResults([]);
    } else {
      const filteredMerchants = Merchants.filter(list =>
        list.name.toLowerCase().includes(setSearchTerm) ||
        list.loc.toLowerCase().includes(setSearchTerm)
        // list.tnc.map(tc => tc.toLowerCase()).includes(setSearchTerm)
      );

      setResults(filteredMerchants);
    }
  };

  const [showModal, setShowModal] = useState(undefined);
  const handleClose = () => setShowModal(undefined);
  const handleShow = (merchantId) => setShowModal(merchantId);

  const [showBanner, setShowBanner] = useState(false);
  const modalBannerShow = () => setShowBanner(true);
  const modalBannerClose = () => setShowBanner(false);

  const [cari, setCari] = useState(false);
  const cariClose = () => setCari(false);
  const cariShow = () => setCari(true);

  const [filter, setFilter] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState(Citys);
  const [filteredData, setFilteredData] = useState(Merchants);
  const filterClose = () => setFilter(false);
  const filterShow = () => setFilter(true);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [countSelectedLocation, setCountSelectedLocation] = useState('');

  const handleFilteredByLocation = (location) => {
    const filtered = Merchants.filter(list =>
      list.filteredCity.toLowerCase().includes(location.toLowerCase()) &&
      list.category === 'penginapan'
    );
    const getLocation = location;
    setSelectedLocation(getLocation);
    setCountSelectedLocation(filtered.length);
    
    if (filtered.length > 0) {
      setFilteredData(filtered);
      filterClose();
      document.getElementById('emptyStateFilterLocation').classList.add('d-none');
      document.getElementById('counterData').classList.add('d-none');
      document.getElementById('btnFilter').classList.add('d-none');
      document.getElementById('filterLocResult').classList.remove('d-none');
    } else {
      setFilteredData(filtered);
      filterClose();
      document.getElementById('emptyStateFilterLocation').classList.remove('d-none');
      document.getElementById('counterData').classList.add('d-none');
      document.getElementById('filterLocResult').classList.add('d-none');
      document.getElementById('btnFilter').classList.add('d-none');
    }
  };

  const handleSearchLocation = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = Citys.filter(city =>
      city.name.toLowerCase().includes(value)
    );
    
    setFilteredLocations(filtered);
  };
  
  const handleReset = () => {
    setFilteredData(Merchants);
    filterClose();
    document.getElementById('emptyStateFilterLocation').classList.add('d-none');
    document.getElementById('counterData').classList.remove('d-none');
    document.getElementById('filterLocResult').classList.add('d-none');
    document.getElementById('btnFilter').classList.remove('d-none');
  }

  useEffect(() => {
    // console.log('Filtered Data:', filteredData);
  }, [filteredData]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <div>
      <Container className='content'>
        <div className='navigator'>
          <div className='d-flex align-items-center'>
            <div className='category-tab'>
              <ul className='nav nav-tabs'>
                <li className='nav-item'>
                  <div className='nav-link active'>Penginapan & Rekreasi</div>
                </li>
                <li className='nav-item'>
                  <a href='https://alfagift.id/external-webview?title=Merchant&url=https://alfagift.id/resources/merchant/restoran/' className='nav-link'>Restoran</a>
                </li>
                <li className='nav-item'>
                  <a href='https://alfagift.id/external-webview?title=Merchant&url=https://alfagift.id/resources/merchant/kesehatan-kecantikan/' className='nav-link'>Kesehatan & Kecantikan</a>
                </li>
                <li className='nav-item'>
                  <a href='https://alfagift.id/external-webview?title=Merchant&url=https://alfagift.id/resources/merchant/fashion-lifestyle/' className='nav-link'>Fashion & Lifestyle</a>
                </li>
                <li>&nbsp;</li>
              </ul>
            </div>
            <div className='d-flex align-items-center pe-3 ps-2'>
              <button type='button' className='btn btn-search' style={{ color: '#666666' }} onClick={() => { cariShow(); onClear(); }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                </svg>
              </button>
              {/* <button type='button' className='btn btn-search' style={{ color: '#666666' }} onClick={() => { filterShow(); onClear(); }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-funnel" viewBox="0 0 16 16">
                  <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2z"/>
                </svg>
              </button> */}
            </div>
          </div>
        </div>
        <Row>
          <Col xs={12}>
            <div className="slider-container mb-3">
              <Slider {...sliderSettings}>
                {Carousel.map((list) => (
                  <div key={list.id}>
                    { list.type === 'page' ? 
                      <a href={list.direct_url} target='_blank' className='text-decoration-none'>
                        <img src={list.image_url} alt='' style={{ width: "100%", borderRadius: "12px" }} />
                      </a> : 
                      list.type === 'modal' ? 
                      <div>
                        <div onClick={modalBannerShow}>
                          <img src={list.image_url} alt='' style={{ width: "100%", borderRadius: "12px" }} />
                        </div>
                        <Modal
                          size="lg"
                          aria-labelledby="contained-modal-title-vcenter"
                          centered
                          show={showBanner}
                          onHide={modalBannerClose}
                          className='bottomsheet-halffull'
                        >
                          <Modal.Body className="px-0">
                            <div className='row justify-content-center mx-0'>
                              <div className='col-8 p-3'>
                                <img src={'https://static-content.alfagift.id/static/merchant/' + list.modal_content.image} alt='' className='img-fluid' />
                              </div>
                            </div>
                            <div className='divider'></div>
                            <div className='p-3'>
                              <div className='text-sm fw7 text-gray'>{ list.modal_content.category }</div>
                              <div className='text-xlg fw7'>{ list.modal_content.name }</div>
                            </div>
                            <div className='px-3'>
                              <div className='fw5 text-lg'>Syarat & Ketentuan</div>
                              <ul className='list-content my-3'>
                                {list.modal_content.tnc.map(terms => (
                                  <li key={terms}>
                                    <div dangerouslySetInnerHTML={{__html: terms}}></div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className='border-dashed my-3'></div>
                            <div className='px-3'>
                              {list.modal_content.loclist.length > 0 || list.modal_content.loc !== '' ? <div className='fw5 text-lg'>Promo berlaku di:</div> : null}
                              {list.modal_content.loc !== '' ? <div className='my-3' dangerouslySetInnerHTML={{__html: list.modal_content.loc}}></div> : null}
                              {list.modal_content.loclist.length > 0 ? 
                                <ul className='list-content my-3'>
                                  {list.modal_content.loclist.map(locations => (
                                    <li key={locations}>
                                      <div dangerouslySetInnerHTML={{__html: locations}}></div>
                                    </li>
                                  ))}
                                </ul>
                              : null}
                            </div>
                            <div className='border-dashed my-3'></div>
                            <div className='px-3'>
                              {list.modal_content.reserve.length > 0 ? 
                                <div>
                                  <div className='fw5 text-lg'>Informasi:</div>
                                  <div className='my-3'>
                                    {list.modal_content.reserve.map(info => (
                                      <div key={info} className='mb-2'>
                                        <div dangerouslySetInnerHTML={{__html: info}}></div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              : null}
                            </div>
                          </Modal.Body>
                          <div className='fixed-action p-3'>
                            <Button variant='outline-primary w-100' onClick={modalBannerClose}>Tutup</Button>
                          </div>
                        </Modal>
                      </div> : null }
                  </div>
                ))}
              </Slider>
            </div>
          </Col>
        </Row>
        <div className='merchant-result'>
          <div className='result-list'>
            <Row className='px-2'>
              <Col xs={12} className='px-2'>
                <div className='mb-2'>
                  <h5 className='mb-2 fw7'>Penginapan & Rekreasi</h5>
                  <div id='btnFilter' onClick={() => { filterShow(); onClear(); }} className='d-flex align-items-center' style={{ border: "solid 1px #D8D8D8", padding: "6px 8px", fontSize: "12px", borderRadius: "8px", width: "fit-content", backgroundColor: "#FFFFFF" }}>
                    <span className='me-1'>Semua Lokasi</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                    </svg>
                  </div>
                  <div id='filterLocResult' className='d-none my-2'>
                    <div className='d-flex'>
                      <div onClick={handleReset} className='d-flex align-items-center justify-content-center me-1' style={{ color: "#D00B0B", fontSize: "12px", border: "solid 1px #D00B0B", borderRadius: "8px", width: "32px" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                          <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                        </svg>
                      </div>
                      <div onClick={() => { filterShow(); onClear(); }} className='d-flex align-items-center' style={{ color: "#005DA6", backgroundColor: "#F8FBFF", border: "solid 1px #005DA6", padding: "6px 8px", fontSize: "12px", borderRadius: "8px", width: "fit-content" }}>
                        <span className='me-1'>{selectedLocation}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                          <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                        </svg>
                      </div>
                    </div>
                    <div className='d-flex align-items-center justify-content-between mt-3'>
                      <div className='fw7' style={{ color: "#666666" }}>{countSelectedLocation} Merchant</div>
                    </div>
                  </div>
                  <div id='counterData' className='fw7 mt-3' style={{ color: "#666666" }}>{countTotalMerchant} Merchant</div>
                </div>
              </Col>
              {filteredData.filter((item) => item.category === "penginapan").map((list) => (
                <Col key={list.merchantId} xs={6} sm={6} md={3} lg={2} className='px-1 py-2'>
                  <div className='card merc-card border-0' onClick={()=>handleShow(list.merchantId)}>
                    <img src={'https://static-content.alfagift.id/static/merchant/' + list.image} alt='' className='img-fluid' />
                    <div className='py-2'>
                      <div className='merc-name'>{list.name}</div>
                    </div>
                  </div>
                </Col>
              ))}
              {Merchants.map(({merchantId, category, name, image, tnc, loc, loclist, reserve, additional, additionalnew}) => {
                return (
                  <Modal
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={showModal === merchantId}
                    onHide={handleClose}
                    key={merchantId}
                    className='bottomsheet-halffull'
                  >
                    <Modal.Body className="p-0">
                      <div className='row justify-content-center mx-0'>
                        <div className='col-8 p-3'>
                          <img src={'https://static-content.alfagift.id/static/merchant/' + image} alt='' className='img-fluid' />
                        </div>
                      </div>
                      <div className='divider'></div>
                      <div className='p-3'>
                        <div className='text-sm fw7 text-gray'>
                          { category === 'restoran' ? <span>Restoran</span> : category === 'kesehatandankecantikan' ? <span>Kesehatan & Kecantikan</span> : category === 'penginapan' ? <span>Penginapan & Rekreasi</span> : category === 'fashion' ? <span>Fashion & Lifestyle</span> : null }
                        </div>
                        <div className='text-xlg fw7'>{name}</div>
                      </div>
                      <div className='px-3'>
                        <div className='fw5 text-lg'>Syarat & Ketentuan:</div>
                        <ul className='list-content my-3'>
                          {tnc.map(terms => (
                            <li key={terms}>
                              <div dangerouslySetInnerHTML={{__html: terms}}></div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className='border-dashed my-3'></div>
                      <div className='px-3'>
                        {loclist.length > 0 || loc !== '' ? <div className='fw5 text-lg'>Promo berlaku di:</div> : null}
                        {loc !== '' ? <div className='my-3' dangerouslySetInnerHTML={{__html: loc}}></div> : null}
                        {loclist.length > 0 ? 
                          <ul className='list-content my-3'>
                            {loclist.map(locations => (
                              <li key={locations}>
                                <div dangerouslySetInnerHTML={{__html: locations}}></div>
                              </li>
                            ))}
                          </ul>
                        : null}
                      </div>
                      <div className='border-dashed my-3'></div>
                      <div className='px-3'>
                        {reserve.length > 0 ? 
                          <div>
                            <div className='fw5 text-lg'>Informasi:</div>
                            <div className='my-3'>
                              {reserve.map(info => (
                                <div key={info} className='mb-2'>
                                  <div dangerouslySetInnerHTML={{__html: info}}></div>
                                </div>
                              ))}
                            </div>
                          </div>
                        : null}
                      </div>
                    </Modal.Body>
                    <div className='fixed-action p-3'>
                      <Button variant='outline-primary w-100' onClick={handleClose}>Tutup</Button>
                    </div>
                  </Modal>
                )
              })}
            </Row>
          </div>
          <div id='emptyStateFilterLocation' className='empty-state d-none'>
            <Row className='justify-content-center'>
              <Col xs={8}>
                <img src='https://static-content.alfagift.id/static/alfagift-app/no_search_result.png' alt='' className='img-fluid mb-3' />
              </Col>
              <Col xs={10} className='text-center'>
                <p className='text-center'>Tidak ditemukan penginapan di "<strong style={{ textTransform: "uppercase" }}>{selectedLocation}</strong>"</p>
                <span onClick={() => { filterShow(); onClear(); }} style={{ fontSize: "14px", fontWeight: "bold", color: "#005DA6" }}>Ubah Lokasi</span>
              </Col>
            </Row>
          </div>
        </div>
      </Container>
      <Modal show={cari} onHide={cariClose} className='fullscreen'>
        <div className='d-flex'>
          <Button variant='link pe-0' style={{ color: '#333333' }} onClick={cariClose}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
              <path d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
            </svg>
          </Button>
          <div className='form-search w-100 p-3'>
            <div className="input-group">
              <span className="input-group-text" style={{ color: '#666666' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                </svg>
              </span>
              <input type='search' className='form-control' placeholder='Cari di semua kategori...' value={searchTerm} onChange={handleSearch} onInput={onInput} />
              <span className='empty-text'>Merchant tidak ditemukan</span>
            </div>
          </div>
        </div>
        <Modal.Body>
          <ul className='list-search-result'>
            {results.map((list) => (
              <li key={list.merchantId} onClick={() => { handleShow(list.merchantId); cariClose(); }} className='py-3'>
                <div className='d-flex'>
                  <img src={'https://static-content.alfagift.id/static/merchant/' + list.image} alt='' />
                  <div>
                    <div className='fw5 mb-1'>{list.name}</div>
                    <div className='text-sm text-gray'>
                      { list.category === 'restoran' ? <span>Restoran</span> : list.category === 'kesehatandankecantikan' ? <span>Kesehatan & Kecantikan</span> : list.category === 'penginapan' ? <span>Penginapan & Rekreasi</span> : list.category === 'fashion' ? <span>Fashion & Lifestyle</span> : null }
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Modal.Body>
        <div className='fixed-action p-3'>
          <Button variant='outline-primary w-100' onClick={cariClose}>Tutup</Button>
        </div>
      </Modal>
      <Modal
        show={filter}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={filterClose}
        className='bottomsheet-half'
      >
        <div className='fixed-head-sheet'>
          <div className='d-flex align-items-center justify-content-between'>
            Filter berdasarkan lokasi
            <span id='resetLocation' onClick={handleReset} style={{ color: "#D00B0B", fontSize: "12px", border: "solid 1px #D00B0B", padding: "4px 16px", borderRadius: "6px" }}>Reset</span>
          </div>
          <div className='form-search w-100 mt-3'>
            <div className="input-group">
              <span className="input-group-text" style={{ color: '#666666' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                </svg>
              </span>
              <input 
                type='search' 
                className='form-control' 
                placeholder='Cari Lokasi...' 
                value={searchTerm}
                onChange={handleSearchLocation}
                onInput={onInput}
              />
            </div>
          </div>
        </div>
        <Modal.Body className="p-0">
          <div className='city-list'>
            {searchTerm !== '' ? 
              <div>
                {filteredLocations.map((city, name) => (
                  <div className='city-list-item' key={name} onClick={() => handleFilteredByLocation(city.name)}>{city.name}</div>
                ))}
              </div> : 
              <div>
                {Citys.map((city, name) => (
                  <div className='city-list-item' key={name} onClick={() => handleFilteredByLocation(city.name)}>{city.name}</div>
                ))}
              </div>}
          </div>
        </Modal.Body>
        <div className='fixed-action p-3'>
          <Button variant='outline-primary w-100' onClick={filterClose}>Tutup</Button>
        </div>
      </Modal>
    </div>
  );
};

export default Main;
