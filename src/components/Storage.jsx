import React from 'react';

export const setToken = value =>{
    sessionStorage.setItem('token', value);
};

export const getToken = () =>{
    return sessionStorage.getItem('token');
};

export const setUser = value =>{
    sessionStorage.setItem('user', value);
};

export const clean = () =>{
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
}

export const tamanho = () => {
    return sessionStorage.length;
}

export const getUser = () =>{
    return sessionStorage.getItem('user');
};