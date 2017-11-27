import * as React from 'react';
import { Header } from '../Header/Header';
import './Welcome.css';

// tslint:disable-next-line
export const Welcome = (props: any) => (
    <div>
        <Header {...props} />
        <div className="welcomeScreen" />
    </div>
);