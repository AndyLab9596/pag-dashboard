import styled from '@emotion/styled';
import { body, caption, color } from './GlobalStyleVariable';

const headerColor = '#2C405A';

export default styled.div`
  @font-face {
    font-family: 'Heebo';
    font-style: normal;
    font-weight: 400;
    src: url('https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700&display=swap');
  }

  html {
    height: 100%;
  }

  body {
    font-family: 'Heebo', sans-serif;
    margin: 0px;
    min-height: 100%;
    color: ${body.color.black};
  }

  h1 {
    font-size: 23px;
    color: ${headerColor};
  }

  h2 {
    font-size: 17px;
    color: ${headerColor};
  }

  h3 {
    font-size: 15px;
    color: ${headerColor};
    font-weight: normal;
  }

  .pagination {
    display: inline-block;
    padding-left: 0;
    margin: 20px 0;
    border-bottom: 1px solid ${body.color.grey};
    font-size: ${caption.fontSize.small};
  }
  .pagination > li {
    display: inline;
  }
  .pagination > li > a,
  .pagination > li > span {
    position: relative;
    float: left;
    padding: 0px 3px;
    margin-left: -1px;
    line-height: 1.42857143;
    color: ${body.color.grey};
    text-decoration: none;
    background-color: #fff;
  }
  .pagination > li:first-of-type > a,
  .pagination > li:first-of-type > span {
    margin-left: 0;
  }
  .pagination > li:last-child > a,
  .pagination > li:last-child > span {
  }
  .pagination > li > a:hover,
  .pagination > li > span:hover,
  .pagination > li > a:focus,
  .pagination > li > span:focus {
    z-index: 2;
    color: #23527c;
    background-color: #eee;
  }
  .pagination > .active > a,
  .pagination > .active > span,
  .pagination > .active > a:hover,
  .pagination > .active > span:hover,
  .pagination > .active > a:focus,
  .pagination > .active > span:focus {
    z-index: 3;
    color: ${color.ceruColor1};
    cursor: default;
  }
  .pagination > .disabled > span,
  .pagination > .disabled > span:hover,
  .pagination > .disabled > span:focus,
  .pagination > .disabled > a,
  .pagination > .disabled > a:hover,
  .pagination > .disabled > a:focus {
    color: #777;
    cursor: not-allowed;
    background-color: #fff;
  }
  .pagination-lg > li > a,
  .pagination-lg > li > span {
    padding: 0px 3px;
    font-size: 18px;
    line-height: 1.3333333;
  }
  .pagination-lg > li:first-of-type > a,
  .pagination-lg > li:first-of-type > span {
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
  }
  .pagination-lg > li:last-child > a,
  .pagination-lg > li:last-child > span {
  }
  .pagination-sm > li > a,
  .pagination-sm > li > span {
    padding: 0px 3px;
    font-size: 12px;
    line-height: 1.5;
  }
  .pagination-sm > li:first-of-type > a,
  .pagination-sm > li:first-of-type > span {
  }
  .pagination-sm > li:last-child > a,
  .pagination-sm > li:last-child > span {
  }
  .pager {
    padding-left: 0;
    margin: 20px 0;
    text-align: center;
    list-style: none;
  }
  .pager li {
    display: inline;
  }
  .pager li > a,
  .pager li > span {
    display: inline-block;
    padding: 5px 14px;
    background-color: #fff;
  }
  .pager li > a:hover,
  .pager li > a:focus {
    text-decoration: none;
    background-color: #eee;
  }
  .pager .next > a,
  .pager .next > span {
    float: right;
  }
  .pager .previous > a,
  .pager .previous > span {
    float: left;
  }
  .pager .disabled > a,
  .pager .disabled > a:hover,
  .pager .disabled > a:focus,
  .pager .disabled > span {
    color: #777;
    cursor: not-allowed;
    background-color: #fff;
  }
  .Popover-tip {
    fill: #b9bec5;
  }
`;
