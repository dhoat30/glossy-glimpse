module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/utils/themeSettings.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "lightTheme",
    ()=>lightTheme,
    "theme",
    ()=>theme
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$createTheme$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__createTheme$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/styles/createTheme.js [app-ssr] (ecmascript) <export default as createTheme>");
;
const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$createTheme$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__createTheme$3e$__["createTheme"])({
    palette: {
        mode: "dark",
        primary: {
            main: "#DCE8D2",
            dark: "#C9DABB"
        },
        secondary: {
            main: "#BDD6AC"
        },
        tertiary: {
            main: "#ffffff"
        },
        contrastThreshold: 4.5
    },
    typography: {
        fontFamily: [
            "var(--font-inter)",
            "Segoe UI",
            "sans-serif"
        ].join(","),
        h1: {
            fontSize: "5rem",
            fontWeight: 800,
            color: "var(--dark-on-surface)",
            lineHeight: "110%",
            fontFamily: [
                "var(--font-manrope)",
                "Segoe UI",
                "sans-serif"
            ].join(","),
            "@media (max-width:900px)": {
                fontSize: "3rem"
            }
        },
        h2: {
            fontWeight: 800,
            color: "var(--dark-on-surface)",
            lineHeight: 1,
            fontSize: "3.5rem",
            fontFamily: [
                "var(--font-manrope)",
                "Segoe UI",
                "sans-serif"
            ].join(","),
            "@media (max-width:600px)": {
                fontSize: "2.5rem"
            }
        },
        h3: {
            fontWeight: 800,
            lineHeight: 1,
            color: "var(--dark-on-surface)",
            fontFamily: [
                "var(--font-manrope)",
                "Segoe UI",
                "sans-serif"
            ].join(",")
        },
        h4: {
            fontWeight: 800,
            color: "var(--dark-on-surface)",
            "@media (max-width:900px)": {
                fontSize: "1.5rem"
            }
        },
        h5: {
            fontWeight: 400,
            lineHeight: "130%",
            letterSpacing: "-0.02rem",
            color: "var(--dark-on-surface)"
        },
        h6: {
            fontWeight: 400,
            lineHeight: "130%",
            color: "var(--dark-on-surface)"
        },
        body1: {
            color: "var( --dark-on-surface-variant)",
            fontWeight: 400
        },
        body2: {
            fontWeight: 400
        },
        subtitle1: {
            color: "var(--dark-on-surface)"
        },
        subtitle2: {
            color: "var(--dark-on-surface)"
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: "50px",
                    textTransform: "none",
                    fontWeight: 600,
                    transition: "all 0.2s ease-in-out",
                    padding: "12px 32px",
                    fontSize: "1rem"
                },
                contained: {
                    "&:hover": {
                        backgroundColor: "#C9DABB",
                        transform: "translateY(-1px)"
                    }
                },
                outlined: {
                    borderRadius: "50px",
                    textTransform: "none",
                    border: "1px solid #DCE8D2",
                    "&:hover": {
                        transform: "translateY(-1px)"
                    }
                },
                containedSecondary: {
                    backgroundColor: "var(--light-primary)",
                    color: "var(--light-on-primary)",
                    "&:hover": {
                        backgroundColor: "var(--dark-primary-container)"
                    }
                }
            }
        }
    }
});
const lightTheme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$createTheme$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__createTheme$3e$__["createTheme"])({
    palette: {
        mode: "light",
        primary: {
            main: "#1E5B43"
        },
        secondary: {
            main: "#1E5B43"
        },
        contrastThreshold: 4.5
    },
    typography: {
        fontFamily: [
            "var(--font-inter)",
            "Segoe UI",
            "sans-serif"
        ].join(","),
        h1: {
            fontSize: "5rem",
            fontWeight: 800,
            color: "var(--light-on-surface)",
            lineHeight: "110%",
            fontFamily: [
                "var(--font-manrope)",
                "Segoe UI",
                "sans-serif"
            ].join(","),
            "@media (max-width:900px)": {
                fontSize: "3rem"
            }
        },
        h2: {
            fontWeight: 800,
            color: "var(--light-on-surface)",
            lineHeight: 1.1,
            fontSize: "3.5rem",
            fontFamily: [
                "var(--font-manrope)",
                "Segoe UI",
                "sans-serif"
            ].join(","),
            "@media (max-width:600px)": {
                fontSize: "2.5rem"
            }
        },
        h3: {
            fontWeight: 800,
            lineHeight: 1,
            color: "var(--light-on-surface)",
            fontFamily: [
                "var(--font-manrope)",
                "Segoe UI",
                "sans-serif"
            ].join(",")
        },
        h4: {
            fontWeight: 800,
            color: "var(--light-on-surface)",
            "@media (max-width:900px)": {
                fontSize: "1.5rem"
            }
        },
        h5: {
            fontWeight: 400,
            lineHeight: "130%",
            letterSpacing: "-0.02rem",
            color: "var(--light-on-surface)"
        },
        h6: {
            fontWeight: 400,
            lineHeight: "130%",
            color: "var(--light-on-surface-variant)"
        },
        body1: {
            color: "var( --light-on-surface-variant)",
            fontWeight: 400
        },
        body2: {
            fontWeight: 400
        },
        subtitle1: {
            color: "var(--light-on-surface)"
        },
        subtitle2: {
            color: "var(--light-on-surface)"
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: "50px",
                    textTransform: "none",
                    fontWeight: 600,
                    transition: "all 0.2s ease-in-out",
                    padding: "12px 32px",
                    fontSize: "1rem"
                },
                contained: {
                    "&:hover": {
                        backgroundColor: "#174A36",
                        transform: "translateY(-1px)"
                    }
                },
                outlined: {
                    borderRadius: "50px",
                    textTransform: "none",
                    border: "1px solid #1E5B43",
                    "&:hover": {
                        transform: "translateY(-1px)"
                    }
                },
                containedSecondary: {
                    backgroundColor: "var(--light-primary)",
                    color: "var(--light-on-primary)",
                    "&:hover": {
                        backgroundColor: "var(--dark-primary-container)"
                    }
                }
            }
        }
    }
});
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/hooks/useNavigationLoading.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// hooks/useNavigationLoading.js
__turbopack_context__.s([
    "useNavigationLoading",
    ()=>useNavigationLoading
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
'use client';
;
;
function useNavigationLoading() {
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setLoading(false);
    }, [
        pathname
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleClick = (e)=>{
            const link = e.target.closest('a');
            if (link && link.href) {
                const url = new URL(link.href);
                const currentUrl = new URL(window.location.href);
                // Only show loading for internal navigation
                if (url.origin === currentUrl.origin && url.pathname !== currentUrl.pathname && !link.target && !e.ctrlKey && !e.metaKey) {
                    setLoading(true);
                }
            }
        };
        // Listen to all clicks on the document
        document.addEventListener('click', handleClick, {
            capture: true
        });
        return ()=>{
            document.removeEventListener('click', handleClick, {
                capture: true
            });
        };
    }, []);
    return loading;
}
}),
"[project]/Components/UI/Loader/LoadingIndicator.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Components/LoadingIndicator.js
__turbopack_context__.s([
    "LoadingIndicatorTailwind",
    ()=>LoadingIndicatorTailwind,
    "default",
    ()=>LoadingIndicator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useNavigationLoading$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useNavigationLoading.js [app-ssr] (ecmascript)");
'use client';
;
;
;
function LoadingIndicator() {
    const loading = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useNavigationLoading$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useNavigationLoading"])();
    if (!loading) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'fixed',
                    top: "64px",
                    left: 0,
                    height: '8px',
                    width: '100%',
                    backgroundColor: 'var(--light-primary)',
                    zIndex: 1000,
                    animation: 'loadingBar 2s ease-in-out infinite'
                },
                className: "jsx-19f17091596d6f9c"
            }, void 0, false, {
                fileName: "[project]/Components/UI/Loader/LoadingIndicator.jsx",
                lineNumber: 11,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                id: "19f17091596d6f9c",
                children: "@keyframes loadingBar{0%{opacity:1;transform:translate(-100%)}50%{opacity:1;transform:translate(0%)}to{opacity:0;transform:translate(100%)}}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true);
}
function LoadingIndicatorTailwind() {
    const loading = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useNavigationLoading$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useNavigationLoading"])();
    if (!loading) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed top-0 left-0 h-1 w-full bg-blue-600 z-50 animate-pulse"
    }, void 0, false, {
        fileName: "[project]/Components/UI/Loader/LoadingIndicator.jsx",
        lineNumber: 50,
        columnNumber: 5
    }, this);
}
}),
"[project]/utils/clickIds.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "initClickIdsOnce",
    ()=>initClickIdsOnce,
    "persist",
    ()=>persist,
    "readFromStorage",
    ()=>readFromStorage
]);
const STORE_KEY = "ad_click_ids_v2";
const hasWindow = ()=>"undefined" !== "undefined";
const hasDocument = ()=>typeof document !== "undefined";
function getCookie(name) {
    if (!hasDocument()) return "";
    const m = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    return m ? decodeURIComponent(m[2]) : "";
}
// --- URL readers ---
// Read click IDs + UTMs + extra tracking params from the current URL
function readFromUrl() {
    if (!hasWindow()) return {};
    //TURBOPACK unreachable
    ;
    const sp = undefined;
    const get = undefined;
}
// --- Cookie readers ---
// Google: gclid from _gcl_aw cookie
function readGoogleFromCookie() {
    const gcl = getCookie("_gcl_aw"); // format: GCL.XXXX.YYYY.<gclid>
    let gclid;
    if (gcl) {
        const parts = gcl.split(".");
        if (parts.length >= 4) gclid = parts[3];
    }
    return gclid ? {
        gclid
    } : {};
}
// Meta: fbp / fbc cookies
function readMetaFromCookie() {
    const fbp = getCookie("_fbp") || undefined;
    const fbc = getCookie("_fbc") || undefined;
    return {
        fbp,
        fbc
    };
}
// If URL has fbclid but _fbc is missing, construct it: fb.1.<ts>.<fbclid>
function buildFbcIfNeeded(ids) {
    if (ids.fbc) return ids.fbc;
    if (!ids.fbclid) return undefined;
    const ts = Math.floor(Date.now() / 1000);
    return `fb.1.${ts}.${ids.fbclid}`;
}
function readFromStorage() {
    if (!hasWindow()) return {};
    //TURBOPACK unreachable
    ;
}
function persist(ids) {
    if (!hasWindow()) return;
    //TURBOPACK unreachable
    ;
    const clean = undefined;
}
function initClickIdsOnce() {
    const fromUrl = readFromUrl();
    const fromGoogleCookie = readGoogleFromCookie();
    const fromMetaCookie = readMetaFromCookie();
    const fromStorage = readFromStorage();
    const merged = {
        // --- Click IDs ---
        gclid: fromUrl.gclid || fromGoogleCookie.gclid || fromStorage.gclid,
        gbraid: fromUrl.gbraid || fromStorage.gbraid,
        wbraid: fromUrl.wbraid || fromStorage.wbraid,
        fbclid: fromUrl.fbclid || fromStorage.fbclid,
        fbp: fromMetaCookie.fbp || fromStorage.fbp,
        fbc: fromMetaCookie.fbc || fromStorage.fbc,
        // --- Generic UTMs ---
        utm_source: fromUrl.utm_source || fromStorage.utm_source,
        utm_medium: fromUrl.utm_medium || fromStorage.utm_medium,
        utm_campaign: fromUrl.utm_campaign || fromStorage.utm_campaign,
        utm_campaign_id: fromUrl.utm_campaign_id || fromStorage.utm_campaign_id,
        utm_content: fromUrl.utm_content || fromStorage.utm_content,
        utm_term: fromUrl.utm_term || fromStorage.utm_term,
        // --- Extra Google tracking ---
        utm_matchtype: fromUrl.utm_matchtype || fromStorage.utm_matchtype,
        utm_network: fromUrl.utm_network || fromStorage.utm_network,
        utm_device: fromUrl.utm_device || fromStorage.utm_device,
        campaign_name: fromUrl.campaign_name || fromStorage.campaign_name,
        adgroup_name: fromUrl.adgroup_name || fromStorage.adgroup_name,
        ad_name: fromUrl.ad_name || fromStorage.ad_name,
        gads_campaign_id: fromUrl.gads_campaign_id || fromStorage.gads_campaign_id,
        gads_adgroup_id: fromUrl.gads_adgroup_id || fromStorage.gads_adgroup_id,
        gads_ad_id: fromUrl.gads_ad_id || fromStorage.gads_ad_id,
        // --- Optional: explicit FB fields if you ever add them ---
        fb_campaign_id: fromUrl.fb_campaign_id || fromStorage.fb_campaign_id,
        fb_adset_id: fromUrl.fb_adset_id || fromStorage.fb_adset_id,
        fb_ad_id: fromUrl.fb_ad_id || fromStorage.fb_ad_id,
        fb_platform: fromUrl.fb_platform || fromStorage.fb_platform,
        fb_site_source: fromUrl.fb_site_source || fromStorage.fb_site_source
    };
    // Create _fbc value if we only have fbclid
    merged.fbc = buildFbcIfNeeded(merged) || merged.fbc;
    persist(merged);
    return merged;
}
}),
"[project]/Components/TrackingPersistence/TrackingPersistence.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TrackingPersistence
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$clickIds$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/clickIds.js [app-ssr] (ecmascript)"); // from our earlier helper
"use client";
;
;
function TrackingPersistence() {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Capture gclid, gbraid, fbclid, etc. from URL or cookies once
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$clickIds$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["initClickIdsOnce"])();
    }, []);
    return null; // nothing to render
}
}),
"[project]/Providers/ClientProvider.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ClientProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$ThemeProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ThemeProvider$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/styles/ThemeProvider.js [app-ssr] (ecmascript) <export default as ThemeProvider>");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$themeSettings$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/themeSettings.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$UI$2f$Loader$2f$LoadingIndicator$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/UI/Loader/LoadingIndicator.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$TrackingPersistence$2f$TrackingPersistence$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Components/TrackingPersistence/TrackingPersistence.jsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function ClientProvider({ children }) {
    // const [isLoading, setIsLoading] = useState(true);
    // useEffect(() => {
    //   const timer = setTimeout(() => setIsLoading(false), 3000); // Adjust timing
    //   return () => clearTimeout(timer);
    // }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$ThemeProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ThemeProvider$3e$__["ThemeProvider"], {
        theme: __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$themeSettings$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["lightTheme"],
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$UI$2f$Loader$2f$LoadingIndicator$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/Providers/ClientProvider.jsx",
                lineNumber: 16,
                columnNumber: 7
            }, this),
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Components$2f$TrackingPersistence$2f$TrackingPersistence$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/Providers/ClientProvider.jsx",
                lineNumber: 19,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Providers/ClientProvider.jsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__4183103b._.js.map