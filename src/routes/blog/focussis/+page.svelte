<script>
  import BlogHeader from "$lib/BlogHeader.svelte";
  import bg from "./bg.avif";
</script>

<BlogHeader {bg} title="What *is* Focus SIS" />
<p>
  Focus SIS is a student information system (SIS) used to manage student data, including attendance
  and grades. Like many other SISs, it looks outdated, but it has a relatively unique history.
</p>
<h2>The start: Centre</h2>
<p>
  Back in Andrew Schmadeke's college years (2004), he made the original Centre with The Miller Group
  <cite><a href="https://gitlab.com/francoisjacquet/centresis/-/blob/3.1/COPYRIGHT">1</a></cite>. It
  was open software under the GPL. However, after a couple of years, he switched things up a bit.
</p>

<h2>Focus of 2006</h2>
<p>
  In 2006
  <cite><a href="https://web.archive.org/web/20060515181645/http://focus-sis.org/">2</a></cite>
  Andrew moved his development efforts to a fork: Focus SIS by Focus School Software.
</p>
<p>
  They let you download the code until March 2008
  <cite
    ><a href="https://web.archive.org/web/20080315092016/http://www.focus-sis.org/download.php">2</a
    ></cite
  >.
</p>
<p>They also had a simple $19/mo through Big Wow Web Hosting plan until March 2008.</p>
<h2>Related projects: Centre and Rosario</h2>
<p>
  In 2009, possibly prompted by Andrew's actions, a few organizations (Glenn-Abbey software, an
  original hoster, and Learners Circle, a new LLC) gave Centre a second life. They took up
  development without Andrew
  <cite><a href="https://gitlab.com/francoisjacquet/centresis/-/blob/3.1/COPYRIGHT">3</a></cite>
  and released many free and paid updates. (The paid updates might've violated the GPL. Too late now
  - Learners Circle is gone.)
</p>
<p>
  In 2013, François Jacquet extended on this updated Centre to make Rosario SIS. Shout out to it for
  being the only actively maintained and public fork of Centre and helping me figure out this
  history.
</p>
<h2>The Focus of today</h2>
<p>
  Andrew Schmadeke has been a constant through many redesigns and revamps. He's still the CEO and
  supposedly micromanages a bit. The company has also made some interesting decisions since.
</p>
<p>
  Even though Focus has kept around its legacy code, it's been growing since. They dropped the
  download link in March 2008 and the "open source" branding in November 2012. Many features and
  integrations have been added, and it's replaced many other SISs.
</p>

<style>
  cite {
    font-style: normal;
    font-size: smaller;
    vertical-align: super;
  }
</style>
