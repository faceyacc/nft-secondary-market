"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/index",{

/***/ "./pages/index.tsx":
/*!*************************!*\
  !*** ./pages/index.tsx ***!
  \*************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Users_lamb_nft2_nft_secondary_market_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js\");\n/* harmony import */ var _Users_lamb_nft2_nft_secondary_market_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ \"./node_modules/@babel/runtime/regenerator/index.js\");\n/* harmony import */ var _Users_lamb_nft2_nft_secondary_market_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Users_lamb_nft2_nft_secondary_market_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ethers */ \"./node_modules/ethers/lib.esm/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var web3modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! web3modal */ \"./node_modules/web3modal/dist/index.js\");\n/* harmony import */ var web3modal__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(web3modal__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! next/link */ \"./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../config */ \"./config.js\");\n/* harmony import */ var _artifacts_contracts_NFT_sol_NFT_json__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../artifacts/contracts/NFT.sol/NFT.json */ \"./artifacts/contracts/NFT.sol/NFT.json\");\n/* harmony import */ var _artifacts_contracts_Market_sol_NFTMarket_json__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../artifacts/contracts/Market.sol/NFTMarket.json */ \"./artifacts/contracts/Market.sol/NFTMarket.json\");\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @chakra-ui/react */ \"./node_modules/@chakra-ui/react/dist/esm/index.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__);\n/* module decorator */ module = __webpack_require__.hmd(module);\n\n\nvar _jsxFileName = \"/Users/lamb/nft2/nft-secondary-market/pages/index.tsx\",\n    _s = $RefreshSig$();\n\n\n\n\n\n\n\n\n\n // 1. import `ChakraProvider` component\n\n\n\n\nfunction App(_ref) {\n  var Component = _ref.Component;\n  // 2. Use at the root of your app\n  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__.ChakraProvider, {\n    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__.Box, {\n      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__.Heading, {\n        children: \"WELCOME TO fullNode NFT Marketplace\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 22,\n        columnNumber: 9\n      }, this)\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 21,\n      columnNumber: 7\n    }, this)\n  }, void 0, false, {\n    fileName: _jsxFileName,\n    lineNumber: 19,\n    columnNumber: 5\n  }, this);\n}\n\n_c = App;\n\nfunction Home() {\n  _s();\n\n  var _this = this;\n\n  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)([]),\n      nfts = _useState[0],\n      setNfts = _useState[1];\n\n  var _useState2 = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)('not-loaded'),\n      loadingState = _useState2[0],\n      setLoadingState = _useState2[1];\n\n  (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(function () {\n    loadNFTs();\n  }, []);\n\n  function loadNFTs() {\n    return _loadNFTs.apply(this, arguments);\n  }\n\n  function _loadNFTs() {\n    _loadNFTs = (0,_Users_lamb_nft2_nft_secondary_market_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__.default)( /*#__PURE__*/_Users_lamb_nft2_nft_secondary_market_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee2() {\n      var provider, tokenContract, marketContract, data, items;\n      return _Users_lamb_nft2_nft_secondary_market_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee2$(_context2) {\n        while (1) {\n          switch (_context2.prev = _context2.next) {\n            case 0:\n              // Query for unsold market items.\n              provider = new ethers__WEBPACK_IMPORTED_MODULE_11__.ethers.providers.JsonRpcProvider();\n              tokenContract = new ethers__WEBPACK_IMPORTED_MODULE_11__.ethers.Contract(_config__WEBPACK_IMPORTED_MODULE_6__.nftaddress, _artifacts_contracts_NFT_sol_NFT_json__WEBPACK_IMPORTED_MODULE_7__.abi, provider);\n              marketContract = new ethers__WEBPACK_IMPORTED_MODULE_11__.ethers.Contract(_config__WEBPACK_IMPORTED_MODULE_6__.nftmarketaddress, _artifacts_contracts_Market_sol_NFTMarket_json__WEBPACK_IMPORTED_MODULE_8__.abi, provider); // Fetch all market items that are for sale.\n\n              _context2.next = 5;\n              return marketContract.fetchMarketItems();\n\n            case 5:\n              data = _context2.sent;\n              _context2.next = 8;\n              return Promise.all(data.map( /*#__PURE__*/function () {\n                var _ref2 = (0,_Users_lamb_nft2_nft_secondary_market_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__.default)( /*#__PURE__*/_Users_lamb_nft2_nft_secondary_market_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee(i) {\n                  var tokenUri, meta, price, item;\n                  return _Users_lamb_nft2_nft_secondary_market_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee$(_context) {\n                    while (1) {\n                      switch (_context.prev = _context.next) {\n                        case 0:\n                          _context.next = 2;\n                          return tokenContract.tokenURI(i.tokenId);\n\n                        case 2:\n                          tokenUri = _context.sent;\n                          _context.next = 5;\n                          return axios__WEBPACK_IMPORTED_MODULE_3___default().get(tokenUri);\n\n                        case 5:\n                          meta = _context.sent;\n                          price = ethers__WEBPACK_IMPORTED_MODULE_11__.ethers.utils.formatUnits(i.price.toString(), 'ether'); // return NFTs\n\n                          // return NFTs\n                          item = {\n                            price: price,\n                            tokenId: i.tokenId,\n                            seller: i.seller,\n                            owner: i.owner,\n                            image: meta.data.image,\n                            name: meta.data.name,\n                            desription: meta.data.desription\n                          };\n                          return _context.abrupt(\"return\", item);\n\n                        case 9:\n                        case \"end\":\n                          return _context.stop();\n                      }\n                    }\n                  }, _callee);\n                }));\n\n                return function (_x2) {\n                  return _ref2.apply(this, arguments);\n                };\n              }()));\n\n            case 8:\n              items = _context2.sent;\n              setNfts(items);\n              setLoadingState('loaded');\n\n            case 11:\n            case \"end\":\n              return _context2.stop();\n          }\n        }\n      }, _callee2);\n    }));\n    return _loadNFTs.apply(this, arguments);\n  }\n\n  function buyNFTs(_x) {\n    return _buyNFTs.apply(this, arguments);\n  }\n\n  function _buyNFTs() {\n    _buyNFTs = (0,_Users_lamb_nft2_nft_secondary_market_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__.default)( /*#__PURE__*/_Users_lamb_nft2_nft_secondary_market_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee3(nft) {\n      var web3Modal, connection, provider, signer, contract, price, transaction;\n      return _Users_lamb_nft2_nft_secondary_market_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee3$(_context3) {\n        while (1) {\n          switch (_context3.prev = _context3.next) {\n            case 0:\n              // Request signature from user for transaction.\n              web3Modal = new (web3modal__WEBPACK_IMPORTED_MODULE_4___default())();\n              _context3.next = 3;\n              return web3Modal.connect();\n\n            case 3:\n              connection = _context3.sent;\n              provider = new ethers__WEBPACK_IMPORTED_MODULE_11__.ethers.providers.Web3Provider(connection);\n              signer = provider.getSigner();\n              contract = new ethers__WEBPACK_IMPORTED_MODULE_11__.ethers.Contract(_config__WEBPACK_IMPORTED_MODULE_6__.nftmarketaddress, _artifacts_contracts_Market_sol_NFTMarket_json__WEBPACK_IMPORTED_MODULE_8__.abi, signer); // Prompts user to pay to complete transaction.\n\n              price = ethers__WEBPACK_IMPORTED_MODULE_11__.ethers.utils.parseUnits(nft.price.toString(), 'ether');\n              _context3.next = 10;\n              return contract.createMarketSale(_config__WEBPACK_IMPORTED_MODULE_6__.nftaddress, nft.tokenId, {\n                value: price\n              });\n\n            case 10:\n              transaction = _context3.sent;\n              _context3.next = 13;\n              return transaction.wait();\n\n            case 13:\n              loadNFTs();\n\n            case 14:\n            case \"end\":\n              return _context3.stop();\n          }\n        }\n      }, _callee3);\n    }));\n    return _buyNFTs.apply(this, arguments);\n  }\n\n  if (loadingState === 'loaded' && !nfts.length) return (\n    /*#__PURE__*/\n    // <h1 className=\"px-20 py-10 text-3xl\">No items in marketplace</h1>\n    (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__.ChakraProvider, {\n      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__.Box, {\n        children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__.Heading, {\n          children: \"WELCOME TO fullNode NFT Marketplace\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 111,\n          columnNumber: 9\n        }, this)\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 110,\n        columnNumber: 7\n      }, this)\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 108,\n      columnNumber: 5\n    }, this)\n  );\n  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__.ChakraProvider, {\n    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__.Flex, {\n      w: 'full',\n      h: \"300px\",\n      backgroundImage: 'url()',\n      backgroundSize: 'cover',\n      backgroundPosition: 'center center',\n      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__.VStack, {\n        w: 'full',\n        justify: 'center',\n        px: \"4\",\n        bgGradient: 'linear(to-r, blue.500, transparent)',\n        children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__.Stack, {\n          maxW: '2xl',\n          align: 'flex-start',\n          spacing: 6,\n          children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__.Heading, {\n            color: 'white',\n            fontWeight: 1100,\n            lineHeight: 1.2,\n            children: \"FullNode - An NFT Exchange\"\n          }, void 0, false, {\n            fileName: _jsxFileName,\n            lineNumber: 137,\n            columnNumber: 13\n          }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__.Heading, {\n            color: 'white',\n            children: \"Create NFTs using MetaMask.\"\n          }, void 0, false, {\n            fileName: _jsxFileName,\n            lineNumber: 143,\n            columnNumber: 13\n          }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__.Stack, {\n            direction: 'row',\n            children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__.Button, {\n              bg: 'orange.400',\n              rounded: 'full',\n              color: 'white',\n              _hover: {\n                bg: 'orange.300'\n              },\n              children: \"Get MetaMask\"\n            }, void 0, false, {\n              fileName: _jsxFileName,\n              lineNumber: 146,\n              columnNumber: 15\n            }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__.Button, {\n              bg: 'white',\n              rounded: 'full',\n              color: 'black',\n              _hover: {\n                bg: 'gray.100'\n              },\n              onClick: function onClick() {\n                return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_5___default()), {\n                  href: '/create-items',\n                  passHref: true,\n                  children: \"Create\"\n                }, void 0, false, {\n                  fileName: _jsxFileName,\n                  lineNumber: 159,\n                  columnNumber: 19\n                }, _this);\n              },\n              children: \"Create an NFT\"\n            }, void 0, false, {\n              fileName: _jsxFileName,\n              lineNumber: 153,\n              columnNumber: 15\n            }, this)]\n          }, void 0, true, {\n            fileName: _jsxFileName,\n            lineNumber: 145,\n            columnNumber: 13\n          }, this)]\n        }, void 0, true, {\n          fileName: _jsxFileName,\n          lineNumber: 136,\n          columnNumber: 11\n        }, this)\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 131,\n        columnNumber: 9\n      }, this)\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 123,\n      columnNumber: 7\n    }, this)\n  }, void 0, false, {\n    fileName: _jsxFileName,\n    lineNumber: 121,\n    columnNumber: 5\n  }, this) // <div className=\"flex justify-center\">\n  //   <div className=\"px-4\" style={{ maxWidth: '1600px' }}>\n  //     <div className=\"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4\">\n  //       {\n  //         nfts.map((nft, i) => (\n  //           <div key={i} className=\"border shadow rounded-xl overflow-hidden\">\n  //             <img src={nft.image} />\n  //             <div className=\"p-4\">\n  //               <p style={{ height: '64px' }} className=\"text-2xl font-semibold\">{nft.name}</p>\n  //               <div style={{ height: '70px', overflow: 'hidden' }}>\n  //                 <p className=\"text-gray-400\">{nft.description}</p>\n  //               </div>\n  //             </div>\n  //             <div className=\"p-4 bg-black\">\n  //               <p className=\"text-2xl mb-4 font-bold text-white\">{nft.price} ETH</p>\n  //               <button className=\"w-full bg-pink-500 text-white font-bold py-2 px-12 rounded\" onClick={() => buyNFTs(nft)}>Buy</button>\n  //             </div>\n  //           </div>\n  //         ))\n  //       }\n  //     </div>\n  //   </div>\n  // </div>\n  ;\n}\n\n_s(Home, \"DL6OJ8B7YCUHYFOUoPi2JI8l+/o=\");\n\n_c2 = Home;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Home);\n\nvar _c, _c2;\n\n$RefreshReg$(_c, \"App\");\n$RefreshReg$(_c2, \"Home\");\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsb0JBREYsZUFRRSw4REFBQyxxREFBRDtBQUNFLGdCQUFFLEVBQUUsT0FETjtBQUVFLHFCQUFPLEVBQUUsTUFGWDtBQUdFLG1CQUFLLEVBQUUsT0FIVDtBQUlFLG9CQUFNLEVBQUU7QUFBRUEsZ0JBQUFBLEVBQUUsRUFBRTtBQUFOLGVBSlY7QUFLRSxxQkFBTyxFQUFFO0FBQUEsb0NBQ1AsOERBQUMsa0RBQUQ7QUFBVSxzQkFBSSxFQUFFLGVBQWhCO0FBQWlDLDBCQUFRLE1BQXpDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHlCQURPO0FBQUEsZUFMWDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxvQkFSRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsa0JBVEY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBTEY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVJGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFGRjtBQUFBO0FBQUE7QUFBQTtBQUFBLFVBRkYsQ0F5REU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQS9FRjtBQWlGRDs7R0F6S1FsRDs7TUFBQUE7QUE2S1QsK0RBQWVBLElBQWYiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvaW5kZXgudHN4P2RiNzYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZXRoZXJzIH0gZnJvbSAnZXRoZXJzJ1xuaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IGF4aW9zLCB7IEF4aW9zUmVzcG9uc2UgfSBmcm9tICdheGlvcydcbmltcG9ydCBXZWIzTW9kZWwgZnJvbSAnd2ViM21vZGFsJ1xuaW1wb3J0IE5leHRMaW5rIGZyb20gJ25leHQvbGluaydcbmltcG9ydCB7XG4gIG5mdGFkZHJlc3MsIG5mdG1hcmtldGFkZHJlc3Ncbn0gZnJvbSAnLi4vY29uZmlnJ1xuXG5pbXBvcnQgTkZUIGZyb20gJy4uL2FydGlmYWN0cy9jb250cmFjdHMvTkZULnNvbC9ORlQuanNvbidcbmltcG9ydCBNYXJrZXQgZnJvbSAnLi4vYXJ0aWZhY3RzL2NvbnRyYWN0cy9NYXJrZXQuc29sL05GVE1hcmtldC5qc29uJ1xuXG4vLyAxLiBpbXBvcnQgYENoYWtyYVByb3ZpZGVyYCBjb21wb25lbnRcbmltcG9ydCB7IEJveCwgSGVhZGluZywgQ2hha3JhUHJvdmlkZXIsIEJ1dHRvbiwgRmxleCwgU3RhY2ssIFZTdGFjaywgVGV4dCwgTGluayB9IGZyb20gXCJAY2hha3JhLXVpL3JlYWN0XCJcblxuZnVuY3Rpb24gQXBwKHsgQ29tcG9uZW50IH0pIHtcbiAgLy8gMi4gVXNlIGF0IHRoZSByb290IG9mIHlvdXIgYXBwXG4gIHJldHVybiAoXG4gICAgPENoYWtyYVByb3ZpZGVyPlxuXG4gICAgICA8Qm94PlxuICAgICAgICA8SGVhZGluZz5cbiAgICAgICAgICBXRUxDT01FIFRPIGZ1bGxOb2RlIE5GVCBNYXJrZXRwbGFjZVxuICAgICAgICA8L0hlYWRpbmc+XG4gICAgICA8L0JveD5cblxuICAgIDwvQ2hha3JhUHJvdmlkZXI+XG4gIClcbn1cblxuZnVuY3Rpb24gSG9tZSgpIHtcbiAgY29uc3QgW25mdHMsIHNldE5mdHNdID0gdXNlU3RhdGUoW10pXG4gIGNvbnN0IFtsb2FkaW5nU3RhdGUsIHNldExvYWRpbmdTdGF0ZV0gPSB1c2VTdGF0ZSgnbm90LWxvYWRlZCcpXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgbG9hZE5GVHMoKVxuICB9LCBbXSlcblxuICBpbnRlcmZhY2UgbWV0YWRhdGFUeXBlIHtcbiAgICBpbWFnZTogc3RyaW5nLFxuICAgIG5hbWU6IHN0cmluZ1xuICAgIGRlc3JpcHRpb246IHN0cmluZyxcbiAgfVxuXG4gIHR5cGUgbmZ0VHlwZSA9IHtcbiAgICBwcmljZTogc3RyaW5nXG4gICAgdG9rZW5JZDogbnVtYmVyXG4gICAgc2VsbGVyOiBzdHJpbmdcbiAgICBvd25lcjogc3RyaW5nXG4gICAgaW1hZ2U6IHVua25vd25cbiAgICBuYW1lOiB1bmtub3duXG4gICAgZGVzcmlwdGlvbjogdW5rbm93blxuICB9XG5cbiAgYXN5bmMgZnVuY3Rpb24gbG9hZE5GVHMoKSB7XG4gICAgLy8gUXVlcnkgZm9yIHVuc29sZCBtYXJrZXQgaXRlbXMuXG4gICAgY29uc3QgcHJvdmlkZXIgPSBuZXcgZXRoZXJzLnByb3ZpZGVycy5Kc29uUnBjUHJvdmlkZXIoKVxuICAgIGNvbnN0IHRva2VuQ29udHJhY3QgPSBuZXcgZXRoZXJzLkNvbnRyYWN0KG5mdGFkZHJlc3MsIE5GVC5hYmksIHByb3ZpZGVyKVxuICAgIGNvbnN0IG1hcmtldENvbnRyYWN0ID0gbmV3IGV0aGVycy5Db250cmFjdChuZnRtYXJrZXRhZGRyZXNzLCBNYXJrZXQuYWJpLCBwcm92aWRlcilcblxuICAgIC8vIEZldGNoIGFsbCBtYXJrZXQgaXRlbXMgdGhhdCBhcmUgZm9yIHNhbGUuXG4gICAgY29uc3QgZGF0YTogbmZ0VHlwZVtdID0gYXdhaXQgbWFya2V0Q29udHJhY3QuZmV0Y2hNYXJrZXRJdGVtcygpXG5cblxuICAgIC8vIE1hcCBvdmVyIGl0ZW1zIHJldHJ1bmVkIGZyb20gc21hcnQgY29udHJhY3QuXG4gICAgY29uc3QgaXRlbXMgPSBhd2FpdCBQcm9taXNlLmFsbChkYXRhLm1hcChhc3luYyAoaTogbmZ0VHlwZSkgPT4ge1xuICAgICAgY29uc3QgdG9rZW5Vcmk6IHN0cmluZyA9IGF3YWl0IHRva2VuQ29udHJhY3QudG9rZW5VUkkoaS50b2tlbklkKVxuXG4gICAgICAvLyBBeGlvcyBjYWxsIHJldHVybnMgbWV0YSBkYXRhIG9mIE5GVCA6IGh0dHBzOi8vZ2F0ZXdheS5waW5hdGEuY2xvdWQvaXBmcy9RbVN2QmNiNHRqZEZwYWpHSmhiRkFXZUszSkF4Q2ROUUxRdHI2WmRpU2k0MlYyXG4gICAgICBjb25zdCBtZXRhOiBBeGlvc1Jlc3BvbnNlPG1ldGFkYXRhVHlwZT4gPSBhd2FpdCBheGlvcy5nZXQodG9rZW5VcmkpXG4gICAgICBjb25zdCBwcmljZTogc3RyaW5nID0gZXRoZXJzLnV0aWxzLmZvcm1hdFVuaXRzKGkucHJpY2UudG9TdHJpbmcoKSwgJ2V0aGVyJylcblxuICAgICAgLy8gcmV0dXJuIE5GVHNcbiAgICAgIGxldCBpdGVtOiBuZnRUeXBlID0ge1xuICAgICAgICBwcmljZSxcbiAgICAgICAgdG9rZW5JZDogaS50b2tlbklkLFxuICAgICAgICBzZWxsZXI6IGkuc2VsbGVyLFxuICAgICAgICBvd25lcjogaS5vd25lcixcbiAgICAgICAgaW1hZ2U6IG1ldGEuZGF0YS5pbWFnZSxcbiAgICAgICAgbmFtZTogbWV0YS5kYXRhLm5hbWUsXG4gICAgICAgIGRlc3JpcHRpb246IG1ldGEuZGF0YS5kZXNyaXB0aW9uLFxuICAgICAgfVxuICAgICAgcmV0dXJuIGl0ZW1cbiAgICB9KSlcbiAgICBzZXROZnRzKGl0ZW1zKVxuICAgIHNldExvYWRpbmdTdGF0ZSgnbG9hZGVkJylcbiAgfVxuXG4gIGFzeW5jIGZ1bmN0aW9uIGJ1eU5GVHMobmZ0OiBuZnRUeXBlKSB7XG4gICAgLy8gUmVxdWVzdCBzaWduYXR1cmUgZnJvbSB1c2VyIGZvciB0cmFuc2FjdGlvbi5cbiAgICBjb25zdCB3ZWIzTW9kYWwgPSBuZXcgV2ViM01vZGVsKClcbiAgICBjb25zdCBjb25uZWN0aW9uID0gYXdhaXQgd2ViM01vZGFsLmNvbm5lY3QoKVxuICAgIGNvbnN0IHByb3ZpZGVyID0gbmV3IGV0aGVycy5wcm92aWRlcnMuV2ViM1Byb3ZpZGVyKGNvbm5lY3Rpb24pXG4gICAgY29uc3Qgc2lnbmVyID0gcHJvdmlkZXIuZ2V0U2lnbmVyKClcbiAgICBjb25zdCBjb250cmFjdCA9IG5ldyBldGhlcnMuQ29udHJhY3QobmZ0bWFya2V0YWRkcmVzcywgTWFya2V0LmFiaSwgc2lnbmVyKVxuXG4gICAgLy8gUHJvbXB0cyB1c2VyIHRvIHBheSB0byBjb21wbGV0ZSB0cmFuc2FjdGlvbi5cbiAgICBjb25zdCBwcmljZSA9IGV0aGVycy51dGlscy5wYXJzZVVuaXRzKG5mdC5wcmljZS50b1N0cmluZygpLCAnZXRoZXInKVxuICAgIGNvbnN0IHRyYW5zYWN0aW9uID0gYXdhaXQgY29udHJhY3QuY3JlYXRlTWFya2V0U2FsZShuZnRhZGRyZXNzLCBuZnQudG9rZW5JZCwge1xuICAgICAgdmFsdWU6IHByaWNlXG4gICAgfSlcbiAgICBhd2FpdCB0cmFuc2FjdGlvbi53YWl0KClcbiAgICBsb2FkTkZUcygpXG4gIH1cbiAgaWYgKGxvYWRpbmdTdGF0ZSA9PT0gJ2xvYWRlZCcgJiYgIW5mdHMubGVuZ3RoKSByZXR1cm4gKFxuXG4gICAgLy8gPGgxIGNsYXNzTmFtZT1cInB4LTIwIHB5LTEwIHRleHQtM3hsXCI+Tm8gaXRlbXMgaW4gbWFya2V0cGxhY2U8L2gxPlxuXG4gICAgPENoYWtyYVByb3ZpZGVyPlxuXG4gICAgICA8Qm94PlxuICAgICAgICA8SGVhZGluZz5cbiAgICAgICAgICBXRUxDT01FIFRPIGZ1bGxOb2RlIE5GVCBNYXJrZXRwbGFjZVxuICAgICAgICA8L0hlYWRpbmc+XG4gICAgICA8L0JveD5cblxuICAgIDwvQ2hha3JhUHJvdmlkZXI+XG5cbiAgKVxuICByZXR1cm4gKFxuXG4gICAgPENoYWtyYVByb3ZpZGVyPlxuXG4gICAgICA8RmxleFxuICAgICAgICB3PXsnZnVsbCd9XG4gICAgICAgIGg9XCIzMDBweFwiXG4gICAgICAgIGJhY2tncm91bmRJbWFnZT17XG4gICAgICAgICAgJ3VybCgpJ1xuICAgICAgICB9XG4gICAgICAgIGJhY2tncm91bmRTaXplPXsnY292ZXInfVxuICAgICAgICBiYWNrZ3JvdW5kUG9zaXRpb249eydjZW50ZXIgY2VudGVyJ30+XG4gICAgICAgIDxWU3RhY2tcbiAgICAgICAgICB3PXsnZnVsbCd9XG4gICAgICAgICAganVzdGlmeT17J2NlbnRlcid9XG4gICAgICAgICAgcHg9XCI0XCJcbiAgICAgICAgICBiZ0dyYWRpZW50PXsnbGluZWFyKHRvLXIsIGJsdWUuNTAwLCB0cmFuc3BhcmVudCknfT5cbiAgICAgICAgICA8U3RhY2sgbWF4Vz17JzJ4bCd9IGFsaWduPXsnZmxleC1zdGFydCd9IHNwYWNpbmc9ezZ9PlxuICAgICAgICAgICAgPEhlYWRpbmdcbiAgICAgICAgICAgICAgY29sb3I9eyd3aGl0ZSd9XG4gICAgICAgICAgICAgIGZvbnRXZWlnaHQ9ezExMDB9XG4gICAgICAgICAgICAgIGxpbmVIZWlnaHQ9ezEuMn0+XG4gICAgICAgICAgICAgIEZ1bGxOb2RlIC0gQW4gTkZUIEV4Y2hhbmdlXG4gICAgICAgICAgICA8L0hlYWRpbmc+XG4gICAgICAgICAgICA8SGVhZGluZyBjb2xvcj17J3doaXRlJ30+Q3JlYXRlIE5GVHMgdXNpbmcgTWV0YU1hc2suPC9IZWFkaW5nPlxuXG4gICAgICAgICAgICA8U3RhY2sgZGlyZWN0aW9uPXsncm93J30+XG4gICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICBiZz17J29yYW5nZS40MDAnfVxuICAgICAgICAgICAgICAgIHJvdW5kZWQ9eydmdWxsJ31cbiAgICAgICAgICAgICAgICBjb2xvcj17J3doaXRlJ31cbiAgICAgICAgICAgICAgICBfaG92ZXI9e3sgYmc6ICdvcmFuZ2UuMzAwJyB9fT5cbiAgICAgICAgICAgICAgICBHZXQgTWV0YU1hc2tcbiAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICBiZz17J3doaXRlJ31cbiAgICAgICAgICAgICAgICByb3VuZGVkPXsnZnVsbCd9XG4gICAgICAgICAgICAgICAgY29sb3I9eydibGFjayd9XG4gICAgICAgICAgICAgICAgX2hvdmVyPXt7IGJnOiAnZ3JheS4xMDAnIH19XG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT5cbiAgICAgICAgICAgICAgICAgIDxOZXh0TGluayBocmVmPXsnL2NyZWF0ZS1pdGVtcyd9IHBhc3NIcmVmPlxuICAgICAgICAgICAgICAgICAgICBDcmVhdGVcbiAgICAgICAgICAgICAgICAgIDwvTmV4dExpbms+XG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgPlxuXG4gICAgICAgICAgICAgICAgQ3JlYXRlIGFuIE5GVFxuICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgIDwvU3RhY2s+XG4gICAgICAgICAgPC9TdGFjaz5cbiAgICAgICAgPC9WU3RhY2s+XG4gICAgICA8L0ZsZXg+XG5cbiAgICA8L0NoYWtyYVByb3ZpZGVyPlxuXG4gICAgLy8gPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktY2VudGVyXCI+XG4gICAgLy8gICA8ZGl2IGNsYXNzTmFtZT1cInB4LTRcIiBzdHlsZT17eyBtYXhXaWR0aDogJzE2MDBweCcgfX0+XG4gICAgLy8gICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBzbTpncmlkLWNvbHMtMiBsZzpncmlkLWNvbHMtNCBnYXAtNCBwdC00XCI+XG4gICAgLy8gICAgICAge1xuICAgIC8vICAgICAgICAgbmZ0cy5tYXAoKG5mdCwgaSkgPT4gKFxuICAgIC8vICAgICAgICAgICA8ZGl2IGtleT17aX0gY2xhc3NOYW1lPVwiYm9yZGVyIHNoYWRvdyByb3VuZGVkLXhsIG92ZXJmbG93LWhpZGRlblwiPlxuICAgIC8vICAgICAgICAgICAgIDxpbWcgc3JjPXtuZnQuaW1hZ2V9IC8+XG4gICAgLy8gICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTRcIj5cbiAgICAvLyAgICAgICAgICAgICAgIDxwIHN0eWxlPXt7IGhlaWdodDogJzY0cHgnIH19IGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtc2VtaWJvbGRcIj57bmZ0Lm5hbWV9PC9wPlxuICAgIC8vICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBoZWlnaHQ6ICc3MHB4Jywgb3ZlcmZsb3c6ICdoaWRkZW4nIH19PlxuICAgIC8vICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNDAwXCI+e25mdC5kZXNjcmlwdGlvbn08L3A+XG4gICAgLy8gICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAvLyAgICAgICAgICAgICA8L2Rpdj5cbiAgICAvLyAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNCBiZy1ibGFja1wiPlxuICAgIC8vICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC0yeGwgbWItNCBmb250LWJvbGQgdGV4dC13aGl0ZVwiPntuZnQucHJpY2V9IEVUSDwvcD5cbiAgICAvLyAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwidy1mdWxsIGJnLXBpbmstNTAwIHRleHQtd2hpdGUgZm9udC1ib2xkIHB5LTIgcHgtMTIgcm91bmRlZFwiIG9uQ2xpY2s9eygpID0+IGJ1eU5GVHMobmZ0KX0+QnV5PC9idXR0b24+XG4gICAgLy8gICAgICAgICAgICAgPC9kaXY+XG4gICAgLy8gICAgICAgICAgIDwvZGl2PlxuICAgIC8vICAgICAgICAgKSlcbiAgICAvLyAgICAgICB9XG4gICAgLy8gICAgIDwvZGl2PlxuICAgIC8vICAgPC9kaXY+XG4gICAgLy8gPC9kaXY+XG4gIClcbn1cblxuXG5cbmV4cG9ydCBkZWZhdWx0IEhvbWUiXSwibmFtZXMiOlsiZXRoZXJzIiwidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJheGlvcyIsIldlYjNNb2RlbCIsIk5leHRMaW5rIiwibmZ0YWRkcmVzcyIsIm5mdG1hcmtldGFkZHJlc3MiLCJORlQiLCJNYXJrZXQiLCJCb3giLCJIZWFkaW5nIiwiQ2hha3JhUHJvdmlkZXIiLCJCdXR0b24iLCJGbGV4IiwiU3RhY2siLCJWU3RhY2siLCJBcHAiLCJDb21wb25lbnQiLCJIb21lIiwibmZ0cyIsInNldE5mdHMiLCJsb2FkaW5nU3RhdGUiLCJzZXRMb2FkaW5nU3RhdGUiLCJsb2FkTkZUcyIsInByb3ZpZGVyIiwicHJvdmlkZXJzIiwiSnNvblJwY1Byb3ZpZGVyIiwidG9rZW5Db250cmFjdCIsIkNvbnRyYWN0IiwiYWJpIiwibWFya2V0Q29udHJhY3QiLCJmZXRjaE1hcmtldEl0ZW1zIiwiZGF0YSIsIlByb21pc2UiLCJhbGwiLCJtYXAiLCJpIiwidG9rZW5VUkkiLCJ0b2tlbklkIiwidG9rZW5VcmkiLCJnZXQiLCJtZXRhIiwicHJpY2UiLCJ1dGlscyIsImZvcm1hdFVuaXRzIiwidG9TdHJpbmciLCJpdGVtIiwic2VsbGVyIiwib3duZXIiLCJpbWFnZSIsIm5hbWUiLCJkZXNyaXB0aW9uIiwiaXRlbXMiLCJidXlORlRzIiwibmZ0Iiwid2ViM01vZGFsIiwiY29ubmVjdCIsImNvbm5lY3Rpb24iLCJXZWIzUHJvdmlkZXIiLCJzaWduZXIiLCJnZXRTaWduZXIiLCJjb250cmFjdCIsInBhcnNlVW5pdHMiLCJjcmVhdGVNYXJrZXRTYWxlIiwidmFsdWUiLCJ0cmFuc2FjdGlvbiIsIndhaXQiLCJsZW5ndGgiLCJiZyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/index.tsx\n");

/***/ })

});