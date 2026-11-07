import { describe, expect, it } from 'vitest';
import { buildProfile, personJsonLd, profileDescription } from '../../lib/profile';
import { isCaseStudyListed } from '../../lib/case-study-visibility';
import { toPlainText } from '../../components/utils/plain-text';

describe('buildProfile', () => {
  it('takes the name and details from the Contentful settings entry', () => {
    const p = buildProfile({ sitetitle: ' Riki Sommers ', jobTitle: 'UX Engineer', skills: ['React', ' '], openToWork: true });
    expect(p.name).toBe('Riki Sommers');
    expect(p.jobTitle).toBe('UX Engineer');
    expect(p.skills).toEqual(['React']);
    expect(p.openToWork).toBe(true);
  });

  it('falls back to a neutral name, never a made-up identity', () => {
    expect(buildProfile(null).name).toBe('Portfolio');
  });

  it('merges profile links with footer social links, https only and de-duplicated', () => {
    const p = buildProfile(
      { profileLinks: ['https://github.com/me'] },
      { socialCollection: { items: [{ url: 'github.com/me' }, { url: 'mailto:a@b.c' }, { url: '/work' }, null] } }
    );
    expect(p.sameAs).toEqual(['https://github.com/me']);
  });

  it('describes the person when no summary is set', () => {
    expect(profileDescription(buildProfile({ sitetitle: 'R', jobTitle: 'Designer', location: 'NZ' }))).toBe('R: Designer, based in NZ.');
  });

  it('emits a Person with only the fields that exist', () => {
    const person = personJsonLd(buildProfile({ sitetitle: 'R', skills: ['Figma'] }));
    expect(person).toMatchObject({ '@type': 'Person', name: 'R', knowsAbout: ['Figma'] });
    expect(person).not.toHaveProperty('jobTitle');
  });
});

describe('isCaseStudyListed', () => {
  it('hides empty case studies and ones tagged only for another site', () => {
    expect(isCaseStudyListed({ blockCount: 0, tags: ['portfolio'] }, 'portfolio')).toBe(false);
    expect(isCaseStudyListed({ blockCount: 3, tags: ['promotional'] }, 'portfolio')).toBe(false);
    expect(isCaseStudyListed({ blockCount: 3, tags: ['portfolio', 'promotional'] }, 'portfolio')).toBe(true);
    expect(isCaseStudyListed({ blockCount: 3, tags: [] }, 'portfolio')).toBe(true);
  });
});

describe('toPlainText', () => {
  it('strips highlight, emphasis, link and image markup', () => {
    expect(toPlainText('Requirements ![logo](//x/star.svg) __release__ the **bits** [here](https://a.b)\n  between')).toBe(
      'Requirements release the bits here between'
    );
  });
});

describe('toPlainText italics', () => {
  it('removes single-asterisk and underscore emphasis, including inside words', () => {
    expect(toPlainText('Re*se*arch and _design_ but snake_case_name stays')).toBe('Research and design but snake_case_name stays');
  });
});

describe('profile links', () => {
  it('ignores bare site home pages, which do not identify a person', () => {
    const p = buildProfile(null, { socialCollection: { items: [{ url: 'codepen.com' }, { url: 'https://bluesky.com/' }, { url: 'https://codepen.io/me' }] } });
    expect(p.sameAs).toEqual(['https://codepen.io/me']);
  });
});
