import styled from '@emotion/styled';

import { color } from '../GlobalStyleVariable';

export const LeftNavWrapper = styled.div`
  border-right: 1px solid #d8e5ee;
  display: inline-block;

  .left-nav-menu {
    height: 100%;
    min-height: calc(100vh - 4em);
    background-image: linear-gradient(to bottom, #cc0000, #660000);
  }

  input[class='nav-toggle-menu']:checked ~ .left-nav-menu {
    transform: none;
    width: 4.5em;
  }

  input[class='nav-toggle-menu'] {
    transition: all 0.3s;
    box-sizing: border-box;
    display: none;
  }
`;

export const LeftNavMenu = styled.div`
  transform: translateX(0);
  width: 16em;
  transition: transform 250ms ease-in-out;
  display: flex;
  flex-direction: column;

  > ul.row-menu {
    list-style-type: none;
    margin: 0;
    padding: 0em;
    display: flex;
    width: 100%;
    overflow: hidden;
    &:last-child {
      flex: 1;
    }

    > li {
      padding: 0em 1em;
      float: left;

      a {
        cursor: pointer;
        padding: 1em;
        display: block;
      }

      &:first-of-type {
        padding-top: 0.5em;
      }

      &:nth-of-type(4n + 2) {
        padding-top: 1em;
      }

      ul.list {
        list-style-type: none;
        padding: 0em;

        li {
          margin: 0em 1em 0em 0em;
        }
      }
    }

    .other {
      height: 100%;
      bottom: 0;
      position: absolute;
      left: 0;
      height: 11em;

      list-style-type: none;
      margin: 0;
      padding: 0em;
      display: flex;
      width: 100%;
      background-image: linear-gradient(to bottom, #cc0000, #660000);
      overflow: hidden;

      li {
        padding: 0em 1em;
      }

      .col-menu {
        border-top: 1px solid #d8e5ee;
        padding: 1em 0em 0em 1em;

        float: left;

        a {
          cursor: pointer;
        }

        ul.list {
          list-style-type: none;
          padding: 0em;

          li {
            padding: 1em 1em;
            margin: 0em 1em 0em 0em;

            &:first-of-type {
              padding-top: 1em;
            }
          }
        }
      }
    }

    > ul.active-sub-menu {
      .col-sub-logo {
        color: ${color.redColor1};
      }

      .active-option {
        background-color: #ecf5fd;
        cursor: pointer;

        a {
          color: ${color.redColor1};
        }
      }
    }

    .col-logo,
    .col-sub-logo {
      color: #d86060;
      font-size: 1.5em;
      z-index: 1;
    }

    .col-menu {
      background: #fff;
      width: 100%;
      z-index: 0;
      padding: 1em 0em 0em 1em;

      span {
        font-size: 11px;
        font-weight: 500;
        color: #5c5c5c;
        letter-spacing: 1.7px;
      }

      li {
        font-size: 13px;
        color: #3f536e;

        &:hover {
          background-color: #ecf5fd;
          cursor: pointer;

          a {
            color: ${color.redColor1};
          }
        }
      }
    }

    div {
      position: absolute;
      bottom: 0;
      border: 1px solid #d8e5ee;
    }
  }

  ul.active-menu {
    .col-logo {
      color: #fff;
    }

    .active-option {
      background-color: #ecf5fd;
      cursor: pointer;

      a {
        color: ${color.redColor1};
      }
    }
  }
`;
