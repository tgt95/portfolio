# Velocity beta

[![npm](https://img.shields.io/npm/v/velocity-animate.svg)](https://www.npmjs.com/package/velocity-animate) [![npm (tag)](https://img.shields.io/npm/v/velocity-animate/beta.svg)](https://www.npmjs.com/package/velocity-animate) [![cdnjs version](https://img.shields.io/cdnjs/v/velocity.svg)](https://cdnjs.com/libraries/velocity) [![npm downloads](https://img.shields.io/npm/dm/velocity-animate.svg)](https://www.npmjs.com/package/velocity-animate) [![jsdelivr downloads](https://data.jsdelivr.com/v1/package/npm/velocity-animate/badge)](https://www.jsdelivr.com/package/npm/velocity-animate)

## NPM: `npm install velocity-animate@beta`

## Docs
[https://github.com/julianshapiro/velocity/wiki](https://github.com/julianshapiro/velocity/wiki)

# IMPORTANT: The velocityjs.org documentation refers to V1, not V2 beta - use the wiki for latest documentation!

## News
WhatsApp, Tumblr, Windows, Samsung, Uber, and thousands of other companies rely on Velocity. Visit [Libscore.com](http://libscore.com/#$.Velocity) to see which sites use Velocity on their homepage.

## React Plugin
Announcement: https://fabric.io/blog/introducing-the-velocityreact-library<br>
Repo: https://github.com/twitter-fabric/velocity-react<br>
NPM: https://www.npmjs.com/package/velocity-react

## Quickstart
### Velocity (CDN, choose one of them):
```html
<script src="//cdn.jsdelivr.net/npm/velocity-animate@2.0/velocity.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/velocity/2.0.3/velocity.min.js"></script>
```

### Velocity UI pack (CDN, choose one of them): 
```html
<script src="//cdn.jsdelivr.net/npm/velocity-animate@2.0/velocity.ui.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/velocity/2.0.3/velocity.ui.min.js"></script>
```

> Please note that JSDelivr can automatically supply the latest release, while CloudFlare needs to ask for a specific version.

### Package managers:
_npm:_ `npm install velocity-animate@beta`

### Automagic chaining:

If using the `.velocity(...)` chained function in libraries such as jQuery or Zepto you need to ensure that Velocity is loaded after them. If you wish to add it to anything loaded afterwards then look at the [Velocity.patch()](https://github.com/julianshapiro/velocity/wiki/Advanced---Patch) method.

## Questions or Problems?
Ask on [StackOverflow](http://stackoverflow.com/tags/velocity.js) (make sure you add the `[velocity.js]` and the `[javascript]` or `[typescript]` tags).

## Updates
- **[2.0](https://github.com/julianshapiro/velocity/compare/1.5.0...2.0.0)**: Typescript update and complete refactoring.
- **[1.5](https://github.com/julianshapiro/velocity/compare/1.4.0...1.5.0)**: Bugfixes, IE9 compatibility fixes.
- **[1.4](https://github.com/julianshapiro/velocity/compare/1.3.0...1.4.0)**: Pause / Resume (per element or global).<br>
Forcefed string animation (just have matching number spaces) including unit conversions and colour names (ie `background:["rgba(red,0.1)", "blue"]`).
High resolution timers (animations should be slightly smoother).<br>
Various fixes including ticker (loading Velocity in a background window) and color handling.
- **[1.3](https://github.com/julianshapiro/velocity/compare/1.2.0...1.3.0)**: Code cleanup - no breaking changes known.
- **[1.2](https://github.com/julianshapiro/velocity/compare/1.1.0...1.2.0)**: [Custom tweens](http://VelocityJS.org/#progress). [Custom easings](http://VelocityJS.org/#easing). ["Finish" command](http://VelocityJS.org/#finish).
- **[1.0](https://github.com/julianshapiro/velocity/compare/0.1.0...1.0.0)**: File name changed to `velocity.js`. Read [VelocityJS.org/#dependencies](http://VelocityJS.org/#dependencies).
- **0.1**: `stop` now stops animations *immediately* (instead of only clearing the remainder of the animation queue). No other backwards-incompatible changes were made.

## Learn
- **Motion design**: [smashingmagazine.com/2014/06/18/faster-ui-animations-with-velocity-js](http://smashingmagazine.com/2014/06/18/faster-ui-animations-with-velocity-js)
- **Animating without jQuery**: [smashingmagazine.com/2014/09/04/animating-without-jquery](http://www.smashingmagazine.com/2014/09/04/animating-without-jquery/)
- **Performance comparisons**: [davidwalsh.name/css-js-animation](http://davidwalsh.name/css-js-animation)
- **Workflow**: [css-tricks.com/improving-ui-animation-workflow-velocity-js](http://css-tricks.com/improving-ui-animation-workflow-velocity-js)

## Comparisons
- **CSS transitions** are meant for simple interface flourishes.
- **jQuery's $.animate()** is slow and poorly-equipped for motion design.
- **Velocity** is a fast, feature-rich standalone alternative to jQuery's $.animate().

## License
[MIT License](LICENSE.md). © Julian Shapiro (http://twitter.com/julian).

## Sponsors

[![Kiss My Button](https://presskit.kissmybutton.gr/logos/kissmybutton-logo-small.png)](https://kissmybutton.gr)  sponsors Velocity's development.

[![BrowserStack](https://raw.githubusercontent.com/julianshapiro/velocity/master/.github/browserstack-logo-182x96.png)](https://browserstack.com/)  provides browser testing services for Velocity.
