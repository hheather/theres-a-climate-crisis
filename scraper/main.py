from guardian_news_download import GuardianScraper
from article_saver import HeadlineExtractor
from pathlib import Path

def combine_titles(root_dir, output_file):
    root_path = Path(root_dir)
    output_path = Path(output_file)
    output_path.parent.mkdir(parents=True, exist_ok=True)  # Ensure output directory exists
    
    with output_path.open('w', encoding='utf-8') as outfile:
        for file_path in root_path.rglob("titles.txt"):  # Recursively find all 'titles.txt'
            with file_path.open('r', encoding='utf-8') as infile:
                for line in infile:
                    clean_line = line.rstrip().replace(" .", ".").replace("?.", "?")
                    outfile.write(clean_line + "\n")  # Fix spacing issue and append newline
    print(f"Combined titles saved to {output_file}")


if __name__ == "__main__":
    scraped_dir = Path(__file__).parent / "scraped_headlines"

    for i in range(1, 401):
        scraper = GuardianScraper(f"https://www.theguardian.com/environment/climate-crisis?page={i}")
        dir_name = scraped_dir / f"page_{i}"
        saver = HeadlineExtractor(dir_name)
        articles = scraper.scrape()
        saver.save_article_titles(articles)
    
    output_dir = Path(__file__).parent / "combined"
    output_filepath = output_dir / "headlines.txt"
    combine_titles(scraped_dir, output_filepath)
