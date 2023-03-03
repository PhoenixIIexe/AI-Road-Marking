import React, { Component } from 'react';


import logo30 from '../../image/logo30.png';
import flagEn from '../../image/flag-en.svg';
import mingcuteRoadLineWhite from '../../image/mingcute-road-line_white.svg';
import importImage from '../../image/image-import.svg';
import uilImageDownload from '../../image/image-download.svg'

import './component-main.css';

class Main extends Component {
    render() {
        return (
            <div className='page'>
                <header className='header'>
                    <div className='header_log-app log-app'>
                        <p className='log-app__name'>
                            AI. Road Marking
                        </p>
                        <img src={logo30} className='log-app__img' />
                    </div>
                    <nav className='header__navigation navigation'>
                        <a className='navigation__calibration button-calibration'>
                            Калибровка
                        </a>

                        <a className='navigation__language button-language'>
                            <img src={flagEn} />
                        </a>
                    </nav>
                </header>

                <main className='main'>
                    <div className='main__log-app'>
                        <p className='log-app__name--white'>
                            AI Road Marking
                        </p>
                        <img src={mingcuteRoadLineWhite} className='log-app__img' />
                    </div>
                    <div className='main__description description'>
                        Приложение для выделения важных объектов дорожной ситуации.
                    </div>
                    <div className='main__import-image import-image'>
                        <input type='file' accept='image/png, image/jpeg' className='import-image__file'></input>
                        <img src={importImage} />
                        Перетащите изображение или нажмите на кнопку
                    </div>
                    <div className='export-image'>
                        <div className='export-image__download-image'>
                            <img src={uilImageDownload} />
                            Скачать
                        </div>
                    </div>
                </main>
            </div>
        );
    };
};

export default Main;