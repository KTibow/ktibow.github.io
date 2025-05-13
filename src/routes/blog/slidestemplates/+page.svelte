<script>
  import BlogHeader from "$lib/BlogHeader.svelte";
  import CaptionedImage from "$lib/CaptionedImage.svelte";
  import bg from "./bg.avif";
  import img0 from "./0.png";
  import img1 from "./1.png";
  import img2 from "./2.png";
  import img3 from "./3.png";
  import img4 from "./4.png";
  import img5 from "./5.png";
  import img6 from "./6.png";
  import img7 from "./7.png";
  import img8 from "./8.png";
  import img9 from "./9.png";
  import img10 from "./10.png";
  import img11 from "./11.png";
  import img12 from "./12.png";
  import img13 from "./13.png";
  import img14 from "./14.png";
  import img15 from "./15.png";
  import img16 from "./16.png";
  import img17 from "./17.png";
  import img18 from "./18.png";
  import img19 from "./19.png";
  import img20 from "./20.png";
  import img21 from "./21.png";
  import img22 from "./22.png";
  import img23 from "./23.png";
  import img24 from "./24.png";
  import img25 from "./25.png";
  import img26 from "./26.png";
  import screenshot1 from "./screenshot-1.png";
  import screenshot2 from "./screenshot-2.png";
  import screenshot3 from "./screenshot-3.png";
  import screenshot4 from "./screenshot-4.png";
  import screenshot5 from "./screenshot-5.png";
  import screenshot6 from "./screenshot-6.png";
</script>

<BlogHeader {bg} title="The new Google Slides templates are honestly funny" />

<p>This month (November 2024) Google added "Templates" to Google Slides.</p>
<div class="grid grid-cols-4 gap-2 not-prose">
  <img src={img0} alt="" />
  <img src={img1} alt="" />
  <img src={img2} alt="" />
  <img src={img3} alt="" />
  <img src={img4} alt="" />
  <img src={img5} alt="" />
  <img src={img6} alt="" />
  <img src={img7} alt="" />
  <img src={img8} alt="" />
  <img src={img9} alt="" />
  <img src={img10} alt="" />
  <img src={img11} alt="" />
  <img src={img12} alt="" />
  <img src={img13} alt="" />
  <img src={img14} alt="" />
  <img src={img15} alt="" />
  <img src={img16} alt="" />
  <img src={img17} alt="" />
  <img src={img18} alt="" />
  <img src={img19} alt="" />
  <img src={img20} alt="" />
  <img src={img21} alt="" />
  <img src={img22} alt="" />
  <img src={img23} alt="" />
  <img src={img24} alt="" />
  <img src={img25} alt="" />
  <img src={img26} alt="" />
</div>
<p>
  On the surface level, they look very good. But once you open one, you see the placeholder text,
  and you start wondering if it's satire. Here's what I mean.
</p>
<div class="flex flex-col items-start gap-4">
  <CaptionedImage
    src={screenshot1}
    alt={"Honestly perplexing: Every time there's a contact slide, the email is \"no reply\". That doesn't really make sense for a *contact* email..."}
  />
  <CaptionedImage
    src={screenshot3}
    alt={'Buzzword overload: This slide from "Sales Pitch"'}
    view="dark"
  />
  <CaptionedImage
    src={screenshot4}
    alt={'Confusing: "Educational games" has a hardcoded winner'}
    view="dark"
  />
</div>
<p>
  <strong>Surely satire</strong>: "Product overview minimal". Let's go over it.
</p>
<ul>
  <li>
    So we start with this company Cymbal. They make water bottles. Would you buy a water bottle from
    a company called Cymbal? I wouldn't but I guess some people might.
  </li>
  <li>
    It starts off relatively slow. "This is who we are", "these are our target consumers", etc.
  </li>
  <li>
    <p>
      But then they explain that they're not just any water bottle company, they're solving a
      problem made up of 3 elements. As you can see, we know the exact proportion of each element:
    </p>
    <img src={screenshot5} alt="" class="h-48" />
  </li>
  <li>
    So then it explains their offering and how it's been growing, shows what it looks like and how
    it's been growing, and includes some testimonials. This is
    <em>mostly</em> normal. Oddly, they feature a 4 star review instead of a 5 star one.
  </li>
  <li>Then - no joke - they have a rewards program. How would a rewards program even work here?</li>
  <li>
    That's basically it. The rest is just the standard growth plan and contact information,
    including the signature no reply email address.
  </li>
</ul>
<p>
  <strong>Accidental?</strong>: "Event faciliation" is supposed to be like flipping through a book,
  but it's out of order
</p>

<h2>On a positive note</h2>
<div class="flex flex-col items-start gap-4">
  <CaptionedImage
    src={screenshot2}
    alt={'Interesting: "Class overview" uses vectors to represent a raster.'}
  />
  <CaptionedImage
    src={screenshot6}
    alt={'Clever: "Course overview" uses Noto Emoji for monochrome icons.'}
    view="dark"
  />
</div>
<p>
  All templates use free fonts from Google Fonts. It goes to show that you can make something
  without losing money.
</p>

<h2>Other thoughts</h2>
<p>
  Templates are really weird in that they look and work like themes, but they're separate from
  themes. Perhaps Google thought themes had a bad rep.
</p>
