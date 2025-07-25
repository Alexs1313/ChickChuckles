import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const htmlContent = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=0.7"/>
    <style>
      html, body {
        margin: 0;
        padding: 0;
        width: 100vw;
        height: 100vh;
        background: linear-gradient(0deg,rgba(62, 28, 8, 0) 0%, rgba(24, 17, 12, 0.1) 48%);
        display: flex;
        justify-content: center;
        align-items: center;
      }

      @keyframes bounce {
        0%, 100% {
          translate: 0px 36px;
        }
        50% {
          translate: 0px 46px;
        }
      }
      @keyframes bounce2 {
        0%, 100% {
          translate: 0px 46px;
        }
        50% {
          translate: 0px 56px;
        }
      }
      @keyframes umbral {
        0% {
          stop-color: #d3a5102e;
        }
        50% {
          stop-color: rgba(211, 165, 16, 0.519);
        }
        100% {
          stop-color: #d3a5102e;
        }
      }
      @keyframes partciles {
        0%, 100% {
          translate: 0px 16px;
        }
        50% {
          translate: 0px 6px;
        }
      }

      #particles {
        animation: partciles 4s ease-in-out infinite;
      }
      #animatedStop {
        animation: umbral 4s infinite;
      }
      #bounce {
        animation: bounce 4s ease-in-out infinite;
        translate: 0px 36px;
      }
      #bounce2 {
        animation: bounce2 4s ease-in-out infinite;
        translate: 0px 46px;
        animation-delay: 0.5s;
      }
    </style>
  </head>

  <body>
    <svg xmlns="http://www.w3.org/2000/svg" width="197" height="287">
      <g style="order: -1">
        <polygon transform="rotate(45 100 100)" stroke-width="1" stroke="#d3a410" fill="none" points="70,70 148,50 130,130 50,150" id="bounce" />
        <polygon transform="rotate(45 100 100)" stroke-width="1" stroke="#d3a410" fill="none" points="70,70 148,50 130,130 50,150" id="bounce2" />
        <polygon transform="rotate(45 100 100)" stroke-width="2" stroke fill="#414750" points="70,70 150,50 130,130 50,150" />
        <polygon stroke-width="2" stroke fill="url(#gradiente)" points="100,70 150,100 100,130 50,100" />
        <defs>
          <linearGradient y2="100%" x2="10%" y1="0%" x1="0%" id="gradiente">
            <stop style="stop-color: #1e2026; stop-opacity: 1" offset="20%" />
            <stop style="stop-color: #414750; stop-opacity: 1" offset="60%" />
          </linearGradient>
        </defs>
        <polygon transform="translate(20, 31)" stroke-width="2" stroke fill="#b7870f" points="80,50 80,75 80,99 40,75" />
        <polygon transform="translate(20, 31)" stroke-width="2" stroke fill="url(#gradiente2)" points="40,-40 80,-40 80,99 40,75" />
        <defs>
          <linearGradient y2="100%" x2="0%" y1="-17%" x1="10%" id="gradiente2">
            <stop style="stop-color: #d3a51000; stop-opacity: 1" offset="20%" />
            <stop style="stop-color: #d3a51054; stop-opacity: 1" offset="100%" id="animatedStop" />
          </linearGradient>
        </defs>
        <polygon transform="rotate(180 100 100) translate(20, 20)" stroke-width="2" stroke fill="#d3a410" points="80,50 80,75 80,99 40,75" />
        <polygon transform="rotate(0 100 100) translate(60, 20)" stroke-width="2" stroke fill="url(#gradiente3)" points="40,-40 80,-40 80,85 40,110.2" />
        <defs>
          <linearGradient y2="100%" x2="10%" y1="0%" x1="0%" id="gradiente3">
            <stop style="stop-color: #d3a51000; stop-opacity: 1" offset="20%" />
            <stop style="stop-color: #d3a51054; stop-opacity: 1" offset="100%" id="animatedStop" />
          </linearGradient>
        </defs>
        <polygon transform="rotate(45 100 100) translate(80, 95)" stroke-width="2" stroke fill="#ffe4a1" points="5,0 5,5 0,5 0,0" id="particles" />
        <polygon transform="rotate(45 100 100) translate(80, 55)" stroke-width="2" stroke fill="#ccb069" points="6,0 6,6 0,6 0,0" id="particles" />
        <polygon transform="rotate(45 100 100) translate(70, 80)" stroke-width="2" stroke fill="#fff" points="2,0 2,2 0,2 0,0" id="particles" />
        <polygon stroke-width="2" stroke fill="#292d34" points="29.5,99.8 100,142 100,172 29.5,130" />
        <polygon transform="translate(50, 92)" stroke-width="2" stroke fill="#1f2127" points="50,50 120.5,8 120.5,35 50,80" />
      </g>
    </svg>
  </body>
</html>
`;

const MiniLoader = () => {
  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{ html: htmlContent }}
        style={styles.fullscreen}
        scrollEnabled={false}
        backgroundColor="transparent"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fullscreen: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

export default MiniLoader;
