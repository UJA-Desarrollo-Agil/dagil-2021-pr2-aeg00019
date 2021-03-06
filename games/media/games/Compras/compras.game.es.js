// ---------------------------------------------------------------------------
// Edit this file to define your game. It should have at least four
// sets of content: undum.game.situations, undum.game.start,
// undum.game.qualities, and undum.game.init.
// ---------------------------------------------------------------------------

/* A unique id for your game. This is never displayed. I use a UUID,
 * but you can use anything that is guaranteed unique (a URL you own,
 * or a variation on your email address, for example). */
undum.game.id = "be1c95b9-cbc7-48c6-8e6a-89837aa9113e";

/* A string indicating what version of the game this is. Versions are
 * used to control saved-games. If you change the content of a game,
 * the saved games are unlikely to work. Changing this version number
 * prevents Undum from trying to load the saved-game and crashing. */
undum.game.version = "1.0";

/* A variable that changes the fade out speed of the option text on
 * a mobile. */
undum.game.mobileHide = 2000

/* A variable that changes the options fade out speed. */
undum.game.fadeSpeed = 1500

/* A variable that changes the slide up speed after clicking on an
 * option. */
undum.game.slideUpSpeed = 500

/* The situations that the game can be in. Each has a unique ID. */
undum.game.situations = {
  start: new undum.SimpleSituation(
    "<h1>Era por la mañana</h1>\
        <img src='media/games/Compras/1.png'  class='float_right' style=\"max-width: 100%;\">\
        <p>Era un día nublado, Alberto se levantó de la cama con una sensación\
        bastante rara, tenia hambre. Se dispuso a levantarse de la cama \
        y dirigirse a la cocina para comer algo, pero algo no iba del todo bien.\
        Cuando abrió la nevera se encontró una terrible sorpresa, no tenia nada para llevarse a la boca ¿Podría pasar toda la mañana sin comer nada?\
        Será mejor darse prisa...\
        <a href='despierto'>Continuar</a></p>", {

      enter: function(character, system, from) {

        if (character.qualities.salud <= 0) {
          system.setCharacterText(
            "<p>Estadísitacas de Alberto (No me vuevas a matar ¿Vale?)</p>"
          );

          system.animateQuality("salud", character.qualities.salud+50);

        }
      },
      tags: ["fin"],
      optionText: "¿Quieres intentarlo otra vez?",
      displayOrder: 1

    }
  ),


  // NB: The 'hub' situation which is the main list of topics, is
  // defined wholly in the HTML file, and doesn't have an entry in
  // the game.situations dictionary in this file.

  // For variety, here we define a situation using the top-level
  // Situation type. This is a neat approach to generate text by
  // looking it up in the HTML document. For static text that makes
  // more sense than writing it longhand.
  situations: new undum.Situation({
    enter: function(character, system, from) {
      system.write($("#s_situations").html());
    },
    tags: ["topic"],
    optionText: "What Undum Games are Made Of",
    displayOrder: 1
  }),

  situations: new undum.Situation({
    enter: function(character, system, from) {
      system.write($("#s_situations").html());
    },
    tags: ["topic"],
    optionText: "What Undum Games are Made Of",
    displayOrder: 1
  }),
  iracomprar: new undum.SimpleSituation(
    "<img src='media/games/Compras/2.png'  class='float_right transient' style=\"max-width: 70%;\"><p class='transient'>Alberto cogió dinero del cajón y se dispuso a ir a comprar la comida que\
        le faltaba, la sensación de tener hambre no era muy agradable así que se preparó rapidamente y salió como una flecha por la puerta de su casa. Al cabo de un rato\
        ya se encontraba en el\
        <a href='compras'>supermercado</a></p>", {
      enter: function(character, system, from) {
        system.animateQuality("salud", character.qualities.salud-10);

        if (character.qualities.salud == 0) {
          system.doLink('fin');
          system.setCharacterText(
            "<p>Estoy...¿En el hospital?</p>"
          );
        }
      },

      heading: "Ir a comprar",
      diplayOrder: 1,
      tags: ["despierto"],

      exit: function(character, system, to) {

        system.setQuality("dinero", character.qualities.dinero + 10);


      },

    }

  ),
  volvercama: new undum.SimpleSituation(
    "<img src='media/games/Compras/3.png'  class='float_right transient' style=\"max-width: 50%;\"><p class='transient'>Alberto se volvió a la cama e intento conciliar el sueño sin muchos\
        resultados, tras un rato intentando dormirse vuelve a levantarse con mucha hambre<a href='despierto'>¿Que hará ahora Alberto?</a></p>", {
      enter: function(character, system, from) {
        system.animateQuality("salud", character.qualities.salud-10);
        if (character.qualities.salud <= 0) {
          system.doLink('fin');
          system.setCharacterText(
            "<p>¿Acabé en el hospital por meterme en la cama?</p>"
          );
        }
      },

      heading: "Volverse a la cama",
      diplayOrder: 3,
      tags: ["despierto"],

    }
  ),

  volvercasa: new undum.SimpleSituation(
    "<p class='transient'>Alberto se volvió a la casa sin saber muy bien que había pasado\
         tenia la sensación de que alguien tomaba las decisiones por el, pero lo peor de todo era\
         que seguía teniendo hambre, sin pensarlo mucho Alberto estaba donde comenzó todo...\
           <a href='despierto'>¿y ahora que?</a></p>", {
      enter: function(character, system, from) {
        system.animateQuality("salud", character.qualities.salud-10);
        if (character.qualities.salud <= 0) {
          system.doLink('fin');
          system.setCharacterText(
            "<p>¿Acabé en el hospital después de comprar?</p>"
          );
        }
      },
      heading: "Volver a la casa",
      diplayOrder: 1,
      tags: ["compras"]

    }
  ),
  pagar: new undum.SimpleSituation(
    "  <img src='media/games/Compras/4.png'  class='float_right transient' style=\"max-width: 40%;\"><p>Alberto se dispuso a pagar la compra, por fin podría quitarse esa\
        sensación tan desagradable. La cajera le indicó que la suma total de la compra eran de 10 euros, Alberto miro con preocupación\
        cuanto llevaba pero por suerte llevaba dinero suficiente. Para la próxima vez debía de mirar cuanto llevaba.\
        Tras comprar se dirigió a toda prisa a casa para poder terminar ese hambre, esta era la última vez que no planificaba\
        la compra semanal.</p> <h1> FIN </h1>", {
      heading: "Pagar en caja",
      diplayOrder: 1,
      tags: ["compras"]

    }
  ),

  sticky: new undum.SimpleSituation(
    "<p>There are three types of link in Undum. The first two we've seen\
        in previous topics:\
        links to change situation and links to carry out an action. When you\
        include a link in your output, Undum parses it and wires it up\
        correctly. If you create a link with a HTML <em>href</em> attribute\
        containing just a name ('ballroom', for\
        example) this will send the character to the situation with that\
        name. Links\
        with two components ('ballroom/view-painting', for example) send\
        the character to a new situation <em>and then</em> carry out the\
        named action ('view-painting' in this case). To carry out an action\
        in the current situation, you can replace the situation name with a\
        dot (so it would be './view-painting'). In all cases, if the\
        character is already in that situation, then the situation's\
        <em>enter</em> method won't be called again.</p>\
        \
        <img src='media/games/tutorial/woodcut2.png' class='float_left'>\
        <p>The third type of link, then, is a general hyperlink. If your\
        link doesn't consist of a single element or pair of elements, as\
        above, then Undum will guess that you have a normal hyperlink. As\
        <a href='http://news.bbc.co.uk' class='sticky'>in this link</a>.\
        If you have a link that <em>does</em> look like an Undum link, you\
        can still force Undum not to interpret it as an action or situation\
        move, by adding the CSS class <em>raw</em> to the HTML <em>a</em> tag.\
        links that don't have the <em>raw</em> class, but that are considered\
        to be non-Undum links (like the link above), will have <em>raw</em>\
        added to them before display. This could allow you to style external\
        links differently, as we have done here.</p>\
        \
        <p>In the last situation I said you can prevent links from being\
        turned into regular text when you move situations. This is done\
        by another CSS class: <em>sticky</em>. When you\
        <a href='oneshot'>leave this situation</a>, you'll notice the\
        external link stays active. This can allow you to have options that\
        stay valid throughout the narrative, for example, such as a spell to\
        teleport home.</p>", {
      tags: ["topic"],
      displayOrder: 3,
      heading: "Different Kinds of Links"
    }
  ),
  oneshot: new undum.SimpleSituation(
    "<p>There is one final option for links. If you give a link\
        the <em>once</em> CSS class, then that link will disappear\
        after it is clicked. This is  used (as in\
        <a href='./one-time-action' class='once'>this link</a>) for\
        actions that you only want to be possible once. There is no\
        point using 'once' on situation links because they'll be turned\
        into text as soon as you click them anyway (unless they are also\
        <em>sticky</em>, of course).</p><p>Once links are useful\
        for actions such as examining an object more carefully. You\
        don't want lots of repeated descriptions, so making the link\
        a <em>once</em> link is more user friendly.</p>\
        <p>If you have more than one link to the same action, then all\
        matching links will be removed, so you don't have to worry about\
        the player having an alternative way to carry out the action.</p>\
        <p class='transient'>After you've clicked the link, let's\
        <a href='hub'>move on</a>.</p>", {
      actions: {
        "one-time-action": "<p>As I said, one time actions are\
                                   mostly used to describe something in\
                                   more detail, where you don't want the\
                                   same descriptive text repeated over and\
                                   over</p>"
      }
    }
  ),
  qualities: new undum.SimpleSituation(
    "<p>Let's talk about the character.\
        The character is described by a series of <em>qualities</em>. These\
        are numeric values that can describe anything from natural abilities\
        to how much of a resource the character controls. Qualities are\
        shown in the box on the right of the text.</p>\
        \
        <p>The qualities there are those you started the game with. When you\
        <a href='quality-types'>go to the next situation</a>, keep your\
        eyes on the character panel. You'll notice I'll give you a boost to\
        your stamina quality. This process is animated and highlighted to\
        draw your attention to it. You could also get a boost of skill\
        by carrying out <a href='./skill-boost'>this action</a> as many\
        times as you like.</p>", {
      heading: "Qualities and the Character",
      tags: ["topic"],
      displayOrder: 4,
      actions: {
        "skill-boost": function(character, system, action) {
          system.setQuality("skill", character.qualities.skill + 1);
        }
      },
      exit: function(character, system, to) {
        if (ch) {

        }
        system.setQuality("stamina", character.qualities.stamina + 1);
      }
    }
  ),
  "quality-types": new undum.SimpleSituation(
    "<p>Not all the qualities in the character panel are displayed as\
        numeric. Internally they are all numeric, but different qualities\
        get to choose how to display themselves. So 'Luck', for example, is\
        displayed as words (based on the FUDGE RPG's adjective scale),\
        and 'Novice' is using just a check-mark.</p>\
        \
        <p>To see how Luck changes, try using this\
        <a href='./luck-boost'>luck-boosting action</a> or this\
        <a href='./luck-reduce'>luck-reducing action</a>. Notice that\
        luck uses a numeric bonus when it runs out of words. There are a range\
        of different display types provided with Undum, and you can easily\
        add your own too.</p>\
        \
        <p>When you <a href='character-text'>leave this situation</a>,\
        I'll set 'Novice' to zero. Watch\
        the character panel, and you'll see that Novice decides it doesn't\
        need to be displayed any more and will be removed. You will also see\
        that when the last\
        quality in a group is removed ('Novice' is in the 'Progress' group),\
        then the group heading is also removed. You can tell Undum what\
        group each quality belongs to, and what order they should be listed.\
        <p>", {
      actions: {
        "luck-boost": function(character, system, action) {
          system.setQuality("luck", character.qualities.luck + 1);
        },
        "luck-reduce": function(character, system, action) {
          system.setQuality("luck", character.qualities.luck - 1);
        }
      },
      exit: function(character, system, to) {
        system.setQuality("novice", 0);
      }
    }
  ),
  "character-text": new undum.SimpleSituation(
    "<h1>Character Text</h1>\
        <p>Above the list of qualities is a short piece of text, called\
        the character-text. This describes the character in some way. It\
        can be set by any action or when entering or leaving a situation.\
        It is just regular HTML content, as for all text in Undum. It can\
        also contain Undum links, so this is another place you can put\
        actions that the character can carry out over a long period of time.\
        </p>\
        <p class='transient'>Let's go back to the\
        <a href='hub'>topic list</a>. As you do, I'll change the\
        character text. Notice that it is highlighted, just the same as\
        when a quality is altered.</p>", {
      exit: function(character, system, to) {
        system.setCharacterText(
          "<p>We're nearing the end of the road.</p>"
        );
      }
    }
  ),
  progress: new undum.SimpleSituation(
    "<p>Sometimes you want to make the change in a quality into a more\
        significant event. You can do this by animating the change in\
        quality. If you <a href='./boost-stamina-action'>boost your\
        stamina</a>, you will see the stamina change in the normal\
        way in the character panel. But you will also see a progress\
        bar appear and animate below.</p>", {
      tags: ["topic"],
      heading: "Showing a Progress Bar",
      displayOrder: 5,
      actions: {
        // I'm going indirect here - the link carries out an
        // action, which then uses doLink to directly change
        // the situation.  This isn't the recommended way (I
        // could have just changed situation in the link), but
        // it illustrates the use of doLink.
        "boost-stamina-action": function(character, system, action) {
          system.doLink("boost-stamina");
        }
      },
      exit: function(character, system, to) {
        system.animateQuality(
          'stamina', character.qualities.stamina + 1

        );
      }
    }
  ),
  "boost-stamina": new undum.SimpleSituation(
    "<p>\
        <img src='media/games/tutorial/woodcut3.png' class='float_right'>\
        The progress bar is also useful in situations where the\
        character block is displaying just the whole number of a quality,\
        whereas some action changes a fraction. If the quality is displaying\
        the character's level, for example, you might want to show a progress\
        bar to indicate how near the character is to levelling up.</p>\
        \
        <p>After a few seconds, the progress bar disappears, to keep the\
        focus on the text. Undum isn't designed for games where a lot of\
        statistic management is needed. If you want a change to be part\
        of the permanent record of the game, then write it in text.</p>\
        \
        <p>Let's <a href='hub'>return to the topic list.</a></p>"
  ),
  // Again, we'll retrieve the text we want from the HTML file.
  "saving": new undum.Situation({
    enter: function(character, system, from) {
      system.write($("#s_saving").html());
    },
    tags: ["topic"],
    displayOrder: 6,
    optionText: "Saving and Loading"
  }),

  "implicit-boost": new undum.SimpleSituation(
    "<p>Your luck has been boosted<span class='transient'>, check the\
        list of options to see if they have changed</span>.</p>", {
      tags: ["example"],
      enter: function(character, system, from) {
        system.animateQuality("luck", character.qualities.luck + 1)
        system.doLink('example-choices');
      },
      optionText: "Boost Your Luck",
      displayOrder: 1,
      canView: function(character, system, host) {
        return character.qualities.luck < 4;
      }
    }
  ),
  "implicit-drop": new undum.SimpleSituation(
    "<p>Your luck has been reduced<span class='transient'>, check the\
        list of options to see if they have changed</span>.</p>", {
      tags: ["example"],
      enter: function(character, system, from) {
        system.animateQuality("luck", character.qualities.luck - 1)
        system.doLink('example-choices');
      },
      optionText: "Reduce Your Luck",
      displayOrder: 2,
      canView: function(character, system, host) {
        return character.qualities.luck > -4;
      }
    }
  ),
  "high-luck-only": new undum.SimpleSituation(
    "<p>Your luck is higher than 'fair'. The link to this \
        situation would not\
        have appeared if it were lower.</p>", {
      tags: ["example"],
      enter: function(character, system, from) {
        system.doLink('example-choices');
      },
      optionText: "High Luck Option",
      displayOrder: 3,
      canView: function(character, system, host) {
        return character.qualities.luck > 0;
      }
    }
  ),


  "last": new undum.SimpleSituation(
    "<h1>Where to Go Now</h1>\
        <p>So that's it. We've covered all of Undum. This situation is the\
        end, because it has no further links. The 'The End' message is\
        just in the HTML output of this situation, it isn't anything special\
        to Undum</p>\
        \
        <p>I've added an\
        inspiration quality to your character list. Its time for you to\
        crack open the game file and write your own story.</p>\
        <h1>The End</h1>", {
      tags: ["topic"],
      optionText: "Finish the Tutorial",
      displayOrder: 8,
      enter: function(character, system, from) {
        system.setQuality("inspiration", 1);
        system.setCharacterText(
          "<p>You feel all inspired, why not have a go?</p>"
        );
      }
    }
  )
};

// ---------------------------------------------------------------------------
/* The Id of the starting situation. */
undum.game.start = "start";

// ---------------------------------------------------------------------------
/* Here we define all the qualities that our characters could
 * possess. We don't have to be exhaustive, but if we miss one out then
 * that quality will never show up in the character bar in the UI. */
undum.game.qualities = {

  dinero: new undum.NumericQuality(
    "Dinero", {
      priority: "0002",
      group: 'stats'
    }
  ),
  salud: new undum.NumericQuality(
    "Salud", {
      priority: "0003",
      group: 'stats'
    }
  ),


};

// ---------------------------------------------------------------------------
/* The qualities are displayed in groups in the character bar. This
 * determines the groups, their heading (which can be null for no
 * heading) and ordering. QualityDefinitions without a group appear at
 * the end. It is an error to have a quality definition belong to a
 * non-existent group. */
undum.game.qualityGroups = {
  stats: new undum.QualityGroup(null, {
    priority: "0001"
  }),
  progress: new undum.QualityGroup('Progress', {
    priority: "0002"
  })
};

// ---------------------------------------------------------------------------
/* This function gets run before the game begins. It is normally used
 * to configure the character at the start of play. */
undum.game.init = function(character, system) {
  character.qualities.salud = 40;
  character.qualities.dinero = 0;
  system.setCharacterText("<p>Todo lo que Alberto lleva en los bolsillos.</p>");
};
